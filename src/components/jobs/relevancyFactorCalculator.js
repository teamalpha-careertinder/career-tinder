import {RelevancyFactors, RelevancyConfig} from "../../constants/relevancyFactors";

const addScoreToJobPost = (jobseeker, jobposting) => {

  // console.log(jobseeker)
    jobposting.slice().reverse().forEach( (job, index, object) => {

      let score = 0;

      let minsalary = Number(job.minsalary) ? Number(job.minsalary) : 0;
 
      if(RelevancyConfig.TIME_IS_ACTIVE) {
        if(job.expirationdate && job.expirationdate.seconds > Math.round(+new Date()/1000))
          score += RelevancyFactors.TIME;
        else{
          console.log("---deleting in date-----"+job.jobtitle)
          jobposting.splice(object.length - 1 - index, 1);
          return;
        }
      }

      if(RelevancyConfig.SKILL_IS_ACTIVE){
        let skillMatch = false;
        if(job.neededskills && job.neededskills.length && jobseeker.skills && jobseeker.skills.length){
          job.neededskills.forEach(skill => {
            jobseeker.skills.forEach(userSkill => {
              if(skill.label.toLowerCase() == userSkill.label.toLowerCase())
              // change to -> if(skill.value.toLowerCase() == userSkill.value.toLowerCase())
              {
                score += RelevancyFactors.EACH_SKILL_MATCH_FACTOR;
                skillMatch = true;
              }
            })
          })
        }
        if(skillMatch)
          score+= RelevancyFactors.SKILL;
        else{
          console.log("---deleting in skill-----"+job.jobtitle)
          jobposting.splice(object.length - 1 - index, 1);
          return;
        }
      }

      if(RelevancyConfig.LANGUAGE_IS_ACTIVE){
        let languageMatch = false;
        // change to -> let languageMatch = false;
        if(job.languages && job.languages.length && jobseeker.languages && jobseeker.languages.length){
          job.languages.forEach(language => {
            jobseeker.languages.forEach(userLanguage => {
              if(language.label.toLowerCase() == userLanguage.label.toLowerCase())
              // change to -> if(language.value.toLowerCase() == userLanguage.value.toLowerCase())
              {
                score += RelevancyFactors.EACH_LANGUAGE_MATCH_FACTOR;
                languageMatch = true;
              }
            })
          })
        }
        if(languageMatch)
          score += RelevancyFactors.LANGUAGE;
        else{
          console.log("---deleting in language-----"+job.jobtitle)
          jobposting.splice(object.length - 1 - index, 1);
          return;
        }
      }
      
      if(RelevancyConfig.EDUCATION_IS_ACTIVE && job.education && jobseeker.education
        && job.education.label.toLowerCase() == jobseeker.education.label.toLowerCase())
      {
        score += RelevancyFactors.EDUCATION;
      }

      if(RelevancyConfig.LOCATION_IS_ACTIVE && job.location && job.location.length && jobseeker.city)
      {
        job.location.forEach(site => {
          if(site.label.toLowerCase() == jobseeker.city.label.toLowerCase())
          // if(site.value.toLowerCase() == jobseeker.city.value.toLowerCase())
          {
            score += RelevancyFactors.LOCATION;
          }
        })
      }
      
      if(RelevancyConfig.SALARY_IS_ACTIVE && Number(jobseeker.minsalary) && minsalary >= Number(jobseeker.minsalary))
        score += RelevancyFactors.SALARY;
      
      if(RelevancyConfig.JOBTYPE_IS_ACTIVE){
        if(job.applyfulltime == jobseeker.applyfulltime)
          score += RelevancyFactors.JOBTYPE;
        if(job.applypartime == jobseeker.applypartime)
          score += RelevancyFactors.JOBTYPE;
      }

      job.relevancyScore = score;
    })
  }

  export default addScoreToJobPost;