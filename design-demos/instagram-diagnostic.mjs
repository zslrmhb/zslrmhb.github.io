// Read-only diagnostic. Never prints credentials, API URLs with tokens, or raw error bodies.
import 'dotenv/config';
const {IG_USER_ID,IG_LONG_LIVED_TOKEN}=process.env;
console.log(JSON.stringify({localUserIdPresent:!!IG_USER_ID,localTokenPresent:!!IG_LONG_LIVED_TOKEN}));
if(IG_USER_ID&&IG_LONG_LIVED_TOKEN){
 try{
  const url=new URL(`https://graph.instagram.com/${encodeURIComponent(IG_USER_ID)}/media`);
  url.searchParams.set('fields','id,timestamp');url.searchParams.set('limit','1');url.searchParams.set('access_token',IG_LONG_LIVED_TOKEN);
  const response=await fetch(url,{signal:AbortSignal.timeout(15000)});const data=await response.json();
  console.log(JSON.stringify({instagram:{http:response.status,code:data.error?.code,subcode:data.error?.error_subcode,explicitExpiredMessage:/expired/i.test(data.error?.message||''),authError:/token|session|oauth/i.test(data.error?.message||''),returnedItems:data.data?.length,latestTimestamp:data.data?.[0]?.timestamp}}));
 }catch{console.log(JSON.stringify({instagram:{networkOrParseFailure:true}}));}
}
try{
 const response=await fetch('https://api.github.com/repos/zslrmhb/zslrmhb.github.io/actions/workflows/instagram.yml/runs?per_page=5',{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});
 const data=await response.json();console.log(JSON.stringify({githubHttp:response.status,runs:data.workflow_runs?.map(r=>({id:r.id,status:r.status,conclusion:r.conclusion,date:r.created_at,url:r.html_url,branch:r.head_branch}))}));
 if(data.workflow_runs?.[0]){
 const jobResponse=await fetch(data.workflow_runs[0].jobs_url,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});const jobs=await jobResponse.json();console.log(JSON.stringify({latestJobs:jobs.jobs?.map(j=>({name:j.name,conclusion:j.conclusion,steps:j.steps?.map(s=>({name:s.name,conclusion:s.conclusion}))}))}));
 }
}catch{console.log(JSON.stringify({githubNetworkOrParseFailure:true}));}
