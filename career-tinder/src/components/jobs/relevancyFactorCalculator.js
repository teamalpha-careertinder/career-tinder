import {RelevancyFactors, RelevancyConfig} from "../../constants/relevancyFactors";
// import moment from "moment"

const addScoreToJobPost = (jobseeker, jobposting) => {

    jobposting.slice().reverse().forEach( (job, index, object) => {

      let score = 0;

      let minsalary = Number(job.minsalary) ? Number(job.minsalary) : 0;
 
      if(job.expirationdate && job.expirationdate.seconds > Math.round(+new Date()/1000))
        score += RelevancyConfig.TIME_IS_ACTIVE ? RelevancyFactors.TIME : 0;
      else{console.log("---deleting in date-----"+job.jobtitle)
        jobposting.splice(object.length - 1 - index, 1);
        return;
      }

      let skillMatch = false;
      if(job.neededskills && job.neededskills.length && jobseeker.skills && jobseeker.skills.length){
        job.neededskills.forEach(skill => {
          jobseeker.skills.forEach(userSkill => {
            if(skill.label.toLowerCase() == userSkill.label.toLowerCase())
            // change to -> if(skill.value.toLowerCase() == userSkill.value.toLowerCase())
            {
              score += RelevancyConfig.SKILL_IS_ACTIVE ? RelevancyFactors.EACH_SKILL_MATCH_FACTOR : 0;
              skillMatch = true;
            }
          })
        })
      }
      if(skillMatch)
        score+= RelevancyConfig.SKILL_IS_ACTIVE ? RelevancyFactors.SKILL : 0;
      else{console.log("---deleting in skill-----"+job.jobtitle)
        jobposting.splice(object.length - 1 - index, 1);
        return;
      }

      let languageMatch = true;
      // change to -> let languageMatch = false;
      if(job.language && job.language.length && jobseeker.language && jobseeker.language.length){
        job.language.forEach(language => {
          jobseeker.language.forEach(userLanguage => {
            if(language.label.toLowerCase() == userLanguage.label.toLowerCase())
            // change to -> if(language.value.toLowerCase() == userLanguage.value.toLowerCase())
            {
              score += RelevancyConfig.LANGUAGE_IS_ACTIVE ? RelevancyFactors.EACH_LANGUAGE_MATCH_FACTOR : 0;
              languageMatch = true;
            }
          })
        })
      }
      if(languageMatch)
        score += RelevancyConfig.LANGUAGE_IS_ACTIVE ? RelevancyFactors.LANGUAGE : 0;
      else{console.log("---deleting in language-----"+job.jobtitle)
        jobposting.splice(object.length - 1 - index, 1);
        return;
      }

      if(job.location && job.location.length && jobseeker.city)
      {
        job.location.forEach(site => {
          if(site.label.toLowerCase() == jobseeker.city.label.toLowerCase())
          // if(site.value.toLowerCase() == jobseeker.city.value.toLowerCase())
          {
            score += RelevancyConfig.LOCATION_IS_ACTIVE ? RelevancyFactors.LOCATION : 0;
          }
        })
      }
      
      if(Number(jobseeker.minsalary) && minsalary > Number(jobseeker.minsalary))
        score += RelevancyConfig.SALARY_IS_ACTIVE ? RelevancyFactors.SALARY : 0;
      
      if(job.applyfulltime == jobseeker.applyfulltime)
        score += RelevancyConfig.JOBTYPE_IS_ACTIVE ? RelevancyFactors.JOBTYPE : 0;
      if(job.applypartime == jobseeker.applypartime)
        score += RelevancyConfig.JOBTYPE_IS_ACTIVE ? RelevancyFactors.JOBTYPE : 0;

      job.relevancyScore = score;
    })
  }

  export default addScoreToJobPost;