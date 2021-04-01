const core = require('@actions/core');
const github = require('@actions/github');
const mime = require('mime');
const fs = require('fs');
const path = require('path');

const releaseToken = core.getInput('release_token');
const releaseTag = core.getInput('release_tag');
const releaseTitle = core.getInput('release_title');
const releaseFile = core.getInput('release_file');

const file = fs.readFileSync(releaseFile);
const stat = fs.statSync(releaseFile);
const fileName = path.basename(releaseFile);

const repo = github.context.repo;
const octokit = github.getOctokit(releaseToken);

const run = async () => {
  let response = await octokit.repos.createRelease({
    owner: repo.owner,
    repo: repo.repo,
    name: releaseTitle,
    tag_name: releaseTag,
    draft: false,
    prerelease: false,
  });

  const releaseId = response.data.id;

  response = await octokit.repos
    .uploadReleaseAsset({
      owner: repo.owner,
      repo: repo.repo,
      name: fileName,
      release_id: releaseId,
      data: file,
      headers: {
        'Content-Type': mime.getType(releaseFile),
        'Content-Length': stat.size,
      },
    })
    .catch((err) => console.log(err));
};

run();
