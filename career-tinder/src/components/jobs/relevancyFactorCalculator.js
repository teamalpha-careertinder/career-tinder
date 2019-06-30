import RelevancyFactors from "../../constants/relevancyFactors";
import moment from "moment"

const addScoreToJobPost = (jobseeker, jobposting) => {

    jobposting.forEach(job => {
      
      let score = 0;

      let minsalary = Number(job.minsalary) ? Number(job.minsalary) : 0;
      let maxsalary = Number(job.maxsalary) ? Number(job.maxsalary) : 0;

      if(minsalary > 0 || maxsalary > 0) 
        score+=RelevancyFactors.IS_PAID;
      
      if(job.expirationdate && moment(job.expirationdate) > moment(new Date()))
        score+=RelevancyFactors.TIME;
      else
        score+=RelevancyFactors.EXPIRED;

      let skillMatch = false;
      if(job.neededskills && job.neededskills.length && jobseeker.skills && jobseeker.skills.length){
        job.neededskills.forEach(skill => {
          jobseeker.skills.forEach(userSkill => {
            if(skill.value.toLowerCase() == userSkill.value.toLowerCase())
            {
              score+=RelevancyFactors.EACH_SKILL_MATCH_FACTOR;
              skillMatch = true;
            }
          })
        })
      }
      if(skillMatch)
        score+=RelevancyFactors.SKILL;

      if(job.location && job.location.length && jobseeker.city)
      {
        job.location.forEach(site => {
          if(site.value.toLowerCase() == jobseeker.city.value.toLowerCase())
          {
            score+=RelevancyFactors.LOCATION;
          }
        })
      }
      
      if(Number(jobseeker.minsalary) && minsalary > Number(jobseeker.minsalary))
        score+=RelevancyFactors.SALARY;
      
      if(job.applyfulltime == jobseeker.applyfulltime)
        score+=RelevancyFactors.JOBTYPE;
      if(job.applypartime == jobseeker.applypartime)
        score+=RelevancyFactors.JOBTYPE;

      job.relevancyScore = score;
      console.log(job.jobtitle + ": "+job.createdAt.toDate())
    })
  }

  export default addScoreToJobPost;