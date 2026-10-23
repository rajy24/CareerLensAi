import { SKILLS_DATABASE, SKILL_ALIASES, normalizeSkill } from './skills-data';
import { JobAnalysisResult } from './types';

/**
 * Extracts recognized skills from arbitrary text (resumes or job descriptions).
 * Uses token-boundary regex matching to avoid substring collisions.
 */
export function extractSkills(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const textLower = ' ' + text.toLowerCase() + ' ';
  const detected = new Set<string>();

  SKILLS_DATABASE.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(textLower)) {
      detected.add(skill);
    }
  });

  Object.keys(SKILL_ALIASES).forEach(alias => {
    const canonical = SKILL_ALIASES[alias];
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_#+])${escaped}([^a-zA-Z0-9_#+]|$)`, 'i');
    if (regex.test(textLower)) {
      detected.add(canonical);
    }
  });

  return Array.from(detected).sort();
}

/**
 * Parses job description text to identify required vs preferred competencies if headers exist.
 */
export function segmentJobRequirements(jdText: string): { required: string[]; preferred: string[] } {
  const lines = jdText.split('\n');
  let currentSection: 'general' | 'required' | 'preferred' = 'general';
  const requiredText: string[] = [];
  const preferredText: string[] = [];
  const generalText: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase().trim();
    if (
      lower.includes('required') || 
      lower.includes('minimum qualification') || 
      lower.includes('must have') || 
      lower.includes('requirements')
    ) {
      currentSection = 'required';
      continue;
    } else if (
      lower.includes('preferred') || 
      lower.includes('nice to have') || 
      lower.includes('bonus') || 
      lower.includes('desired')
    ) {
      currentSection = 'preferred';
      continue;
    }

    if (currentSection === 'required') {
      requiredText.push(line);
    } else if (currentSection === 'preferred') {
      preferredText.push(line);
    } else {
      generalText.push(line);
    }
  }

  const requiredSkills = extractSkills(requiredText.join(' '));
  const preferredSkills = extractSkills(preferredText.join(' '));
  const generalSkills = extractSkills(generalText.join(' '));

  // If no sections were explicitly detected, treat all general skills as required
  if (requiredSkills.length === 0 && preferredSkills.length === 0) {
    return { required: generalSkills, preferred: [] };
  }

  // Merge any unmatched general skills into required
  const allExplicit = new Set([...requiredSkills, ...preferredSkills]);
  const leftoverRequired = generalSkills.filter(s => !allExplicit.has(s));

  return {
    required: Array.from(new Set([...requiredSkills, ...leftoverRequired])).sort(),
    preferred: preferredSkills.filter(s => !requiredSkills.includes(s)).sort()
  };
}

/**
 * Deterministic analysis comparing user skills with job description.
 * Ensures zero-denominator guard is respected.
 */
export function analyzeJobCompatibility(
  userSkills: string[],
  jdText: string,
  jobTitle: string = 'Target Role',
  companyName: string = 'Target Company'
): JobAnalysisResult {
  const normalizedUserSkills = Array.from(
    new Set(userSkills.map(s => normalizeSkill(s)).filter(Boolean))
  );

  const detectedJdSkills = extractSkills(jdText);
  const totalJd = detectedJdSkills.length;
  const { required, preferred } = segmentJobRequirements(jdText);

  // Zero-Denominator Guard
  if (totalJd === 0) {
    return {
      id: `analysis-${Date.now()}`,
      job_title: jobTitle,
      company_name: companyName,
      job_text: jdText,
      detected_jd_skills: [],
      matched_skills: [],
      missing_skills: [],
      required_skills: [],
      preferred_skills: [],
      match_percentage: null,
      readiness_level: "No Requirements Detected",
      readiness_badge_class: "badge-info",
      readiness_headline: "Add a more detailed job description",
      readiness_description: "We couldn't detect recognized technical skills in the text provided. Please paste a job description with specific qualifications or requirements to evaluate your readiness.",
      math_explanation: {
        total_jd_count: 0,
        matched_count: 0,
        missing_count: 0,
        percentage: null,
        formula_str: "Match percentage requires at least one recognized skill requirement.",
        calculation_str: "Zero recognized technical skills detected in the provided text."
      },
      created_at: new Date().toISOString()
    };
  }

  const userSkillSet = new Set(normalizedUserSkills);
  const matched = detectedJdSkills.filter(s => userSkillSet.has(s));
  const missing = detectedJdSkills.filter(s => !userSkillSet.has(s));
  const matchedCount = matched.length;

  const matchPercentage = Math.round((matchedCount / totalJd) * 100);

  let readinessLevel = "Development Needed";
  let readinessBadgeClass = "badge-danger";
  let readinessHeadline = "Key Skill Gaps Identified";
  let readinessDescription = "You currently match less than 50% of the technical qualifications detected in this posting. Review the missing competencies below and prioritize them in your learning plan.";

  if (matchPercentage >= 75) {
    readinessLevel = "Strong Alignment";
    readinessBadgeClass = "badge-success";
    readinessHeadline = "High Technical Compatibility";
    readinessDescription = "Your profile aligns with the vast majority of detected requirements for this position. Review the few remaining gaps and proceed with application.";
  } else if (matchPercentage >= 50) {
    readinessLevel = "Moderate Alignment";
    readinessBadgeClass = "badge-warning";
    readinessHeadline = "Solid Foundation with Actionable Gaps";
    readinessDescription = "You have a solid foundation matching several core requirements. Addressing the prioritized missing skills will significantly strengthen your candidacy.";
  }

  return {
    id: `analysis-${Date.now()}`,
    job_title: jobTitle,
    company_name: companyName,
    job_text: jdText,
    detected_jd_skills: detectedJdSkills,
    matched_skills: matched,
    missing_skills: missing,
    required_skills: required,
    preferred_skills: preferred,
    match_percentage: matchPercentage,
    readiness_level: readinessLevel,
    readiness_badge_class: readinessBadgeClass,
    readiness_headline: readinessHeadline,
    readiness_description: readinessDescription,
    math_explanation: {
      total_jd_count: totalJd,
      matched_count: matchedCount,
      missing_count: missing.length,
      percentage: matchPercentage,
      formula_str: `Match % = ( Matched Skills [${matchedCount}] / Total Detected Requirements [${totalJd}] ) × 100%`,
      calculation_str: `(${matchedCount} / ${totalJd}) × 100 = ${((matchedCount / totalJd) * 100).toFixed(1)}% (Rounded to ${matchPercentage}%)`
    },
    created_at: new Date().toISOString()
  };
}
