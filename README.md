# GitHub-Release-Action

Publish GitHub releases with this action

## Example

```yml
on: [push]

jobs:
  release:
    runs-on: ubuntu-latest
    name: Release job
    steps:
    - uses: actions/checkout@master
    - name: 'Create a file'
      run: echo "Test" > my_file.txt
    - name: 'Uploud artifact'
      uses: 'actions/upload-artifact@v2'
      with:
        name: my-artifact
        path: my_file.txt
    - name: GitHub Release Action
      uses: 1fxe/GitHub-Release-Action@main
      with:
        release_token: ${{ secrets.RELEASE_TOKEN }}
        release_tag: v0.0.1
        release_title: Github-Release-Action 0.0.1
        release_file: my_file.txt
```

You need to create a RELEASE_TOKEN click [here](https://docs.github.com/en/actions/reference/encrypted-secrets) to see how to create one
