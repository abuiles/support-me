import { Octokit } from "@octokit/rest";

// add repos where the issue should be included
let repos = [

];

// link to a github gist which will be used as the issue
export default async function supportMe(gistId: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTHTOKEN
  })

  let { data: gist } = await octokit.gists.get({
    gist_id: gistId
  });

  let file = gist.files[Object.keys(gist.files)[0]];
  
  let title = gist.description;
  let body = file.content;

  for (let repoLink of repos) {
    let [owner, repo] = repoLink.split("https://github.com/")[1].split("/");
    console.log(`creating issue in ${owner}/${repo}`);

    try {
      let { data: issue } = await octokit.issues.create({
        owner,
        repo, 
        title,
        body
      });

      console.log(`issue created ${issue.url}`);
    } catch(e) {
      console.log(e);
    }
  }
}
