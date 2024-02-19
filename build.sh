#!/bin/bash
branch=$(git branch | grep \* | cut -d ' ' -f2)
branch=$(echo "$branch" | sed 's/features\///g')
echo "Building branch $branch"
if [ -z "$VAULT_MASTER_SSH_PRIV_KEY" ]; then
    
    echo "Running not on woodpecker"
else 
    mkdir -p ~/.ssh/
    echo "$VAULT_MASTER_SSH_PRIV_KEY" > ~/.ssh/id_rsa
    echo "$VAULT_MASTER_SSH_PUB_KEY" > ~/.ssh/id_rsa.pub
    chmod 600 ~/.ssh/id_rsa
    chmod 664 ~/.ssh/id_rsa.pub
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_rsa
    echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
fi

if [ "$branch" == "test" ]; then
    HOST_DOMAIN="nwaifu.su"
else
    echo "No configuration for branch $branch"
    exit 1
fi

export DOCKER_HOST="ssh://root@$HOST_DOMAIN:9724"

docker compose -p test-neuro build