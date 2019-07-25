import {
  RelevancyFactors,
  RelevancyConfig
} from "../../constants/relevancyFactors";
const boyerMoore = require("../../store/actions/Boyer-Moore").boyerMooreSearch;

const addScoreToJobSeeker = (jobposting, jobseekers) => {
  jobseekers.forEach(seeker => {
    let score = 0;

    let minsalary = Number(seeker.minsalary) ? Number(seeker.minsalary) : 0;

    let skillMatch = false;
    if (
      jobposting.neededskills &&
      jobposting.neededskills.length &&
      seeker.skills &&
      seeker.skills.length
    ) {
      seeker.skills.forEach(userSkill => {
        jobposting.neededskills.forEach(jobSkill => {
          if (
            boyerMoore(
              jobSkill.label.toLowerCase(),
              userSkill.label.toLowerCase()
            ) // string pattern matching using Boyer–Moore string-search algorithm
          ) {
            score += RelevancyFactors.EACH_SKILL_MATCH_FACTOR;
            skillMatch = true;
          }
        });
      });
    }
    if (skillMatch) score += RelevancyFactors.SKILL;

    if (jobposting.location && jobposting.location.length && seeker.city) {
      jobposting.location.forEach(site => {
        if (site.label.toLowerCase() === seeker.city.label.toLowerCase()) {
          score += RelevancyFactors.LOCATION;
        }
      });
    }

    if (
      RelevancyConfig.EDUCATION_IS_ACTIVE &&
      jobposting.education &&
      seeker.education &&
      jobposting.education.label.toLowerCase() ===
        seeker.education.label.toLowerCase()
    ) {
      score += RelevancyFactors.EDUCATION;
    }

    if (
      Number(jobposting.maxsalary) &&
      Number(jobposting.maxsalary) >= minsalary
    ) {
      score += RelevancyFactors.SALARY;
    }

    if (
      jobposting.applyfulltime === seeker.applyfulltime ||
      jobposting.applypartime === seeker.applypartime
    ) {
      score += RelevancyFactors.JOBTYPE;
    }

    seeker.relevancyScore = score;
  });
};

export default addScoreToJobSeeker;
