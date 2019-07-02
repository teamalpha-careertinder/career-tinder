import {RelevancyFactors} from "../../constants/relevancyFactors";
import moment from "moment";

const addScoreToJobSeeker = (jobposting, jobseekers) => {
  jobseekers.forEach(seeker => {
    let score = 0;

    let minSalary = Number(seeker.minSalary) ? Number(seeker.minSalary) : 0;
    let maxSalary = Number(seeker.maxSalary) ? Number(seeker.maxSalary) : 0;

    if (minSalary > 0 || maxSalary > 0) score += RelevancyFactors.IS_PAID;

    score += RelevancyFactors.TIME;

    let skillMatch = false;
    if (
      jobposting.neededskills &&
      jobposting.neededskills.length &&
      seeker.skills &&
      seeker.skills.length
    ) {
      seeker.skills.forEach(userSkill => {
        jobposting.neededskills.forEach(jobSkill => {
          if (jobSkill.value.toLowerCase() == userSkill.value.toLowerCase()) {
            score += RelevancyFactors.EACH_SKILL_MATCH_FACTOR;
            skillMatch = true;
          }
        });
      });
    }
    if (skillMatch) score += RelevancyFactors.SKILL;

    if (jobposting.location && jobposting.location.length && seeker.city) {
      jobposting.location.forEach(site => {
        if (site.value.toLowerCase() == seeker.city.value.toLowerCase()) {
          score += RelevancyFactors.LOCATION;
        }
      });
    }

    if (
      Number(jobposting.minsalary) &&
      minSalary <= Number(jobposting.minsalary)
    ) {
      score += RelevancyFactors.SALARY;
    }

    if (
      jobposting.applyfulltime == seeker.applyfulltime ||
      jobposting.applypartime == seeker.applypartime
    )
      score += RelevancyFactors.JOBTYPE;

    seeker.relevancyScore = score;
  });
};

export default addScoreToJobSeeker;
