import { Octokit } from "@octokit/rest";

// add repos where the issue should be included
let repos = [
  "https://github.com/elucidsoft/dotnet-stellar-sdk",
  "https://github.com/revelrylabs/elixir-stellar-client",
  "https://github.com/stellar/java-stellar-sdk",
  "https://github.com/StellarCN/py-stellar-base",
  "https://github.com/bnogalm/StellarQtSDK",
  "https://github.com/stellar/ruby-stellar-sdk",
  "https://github.com/Synesso/scala-stellar-sdk",
  "https://github.com/Soneso/stellar-ios-mac-sdk",
  "https://github.com/testnetai/stellar-api",
  "https://github.com/jillesvangurp/stellar-kotlin-client",
  "https://github.com/stellar/js-stellar-base",
  "https://github.com/stellar/js-stellar-sdk",
  "https://github.com/stellar/go"
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

// this list is used to update the issue.
let issues = [];

// link to a github gist which will be used as the issue
async function updateMe(gistId: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTHTOKEN
  })

  let { data: gist } = await octokit.gists.get({
    gist_id: gistId
  });

  let file = gist.files[Object.keys(gist.files)[0]];
  
  let title = gist.description;
  let body = file.content;

  for (let meta of issues) {
    let repoLink =  meta[0] as string;
    let issue_number = meta[1] as number;
    let [owner, repo] = repoLink.split("https://github.com/")[1].split("/");
    console.log(`update issue in ${owner}/${repo}/${issue_number}`);

    try {
      let { data: issue } = await octokit.issues.update({
        owner,
        repo, 
        issue_number,
        body
      });

      console.log(`issue update ${issue.url}`);
    } catch(e) {
      console.log(e);
    }
  }
}

// this functions append a new comment to all the issues
async function commentMe(gistId: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTHTOKEN
  })

  let { data: gist } = await octokit.gists.get({
    gist_id: gistId
  });

  let file = gist.files[Object.keys(gist.files)[0]];
  
  let title = gist.description;
  let body = file.content;

  for (let meta of issues) {
    let repoLink =  meta[0] as string;
    let issue_number = meta[1] as number;
    let [owner, repo] = repoLink.split("https://github.com/")[1].split("/");
    console.log(`update issue in ${owner}/${repo}/${issue_number}`);

    try {
      let { data: issue } = await octokit.issues.createComment({
        owner,
        repo, 
        issue_number,
        body
      });

      console.log(`issue update ${issue.url}`);
    } catch(e) {
      console.log(e);
    }
  }
}

supportMe("REPLACE_WITH_GIST_ID")

