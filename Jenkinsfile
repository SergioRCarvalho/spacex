pipeline {
    agent { label 'docker-agent-node22' }

    triggers {
        // Check Git repo every minute
        // Just to not create a new subdomain (/github-webhook) to redirect to jenkins
        pollSCM('* * * * *')
    }

    environment {
        IMAGE_TAG      = "${GIT_COMMIT}"
        MAIN_CONTAINER = "spacex-launches-frontend"
        TEMP_CONTAINER = "spacex-launches-frontend-temp-${GIT_COMMIT}"
        TEMP_PORT      = "3001"
        MAIN_PORT      = "3000"
        HOST_IP        = "10.10.20.33"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                    sh """
                      echo "Building Docker image with tag ${IMAGE_TAG}..."
                      docker build \\
                        -t frontend:${IMAGE_TAG} .
                    """
            }
        }

        stage('Test & Deploy') {
            steps {
                sh """
                  set -euo pipefail

                  echo "Removing leftover temp container..."
                  docker rm -f ${TEMP_CONTAINER} || true

                  echo "Freeing host port ${TEMP_PORT} if in use..."
                  CONTAINERS_USING_PORT=\$(docker ps --format '{{.ID}} {{.Ports}}' | awk '/:${TEMP_PORT}->/ {print \$1}')
                  if [ -n "\$CONTAINERS_USING_PORT" ]; then
                      echo "Port ${TEMP_PORT} is in use by container(s): \$CONTAINERS_USING_PORT"
                      docker rm -f \$CONTAINERS_USING_PORT || true
                  else
                      echo "Port ${TEMP_PORT} is free."
                  fi

                  echo "Starting temp container on port ${TEMP_PORT}..."
                  docker run -d --name ${TEMP_CONTAINER} -p ${TEMP_PORT}:3000 frontend:${IMAGE_TAG}

                  echo "Waiting for temp container to become healthy..."
                  HEALTHY=0
                  for i in \$(seq 1 40); do
                      STATUS=\$(curl -s -o /dev/null -w "%{http_code}" http://${HOST_IP}:${TEMP_PORT} || echo 000)
                      echo "Attempt \$i: HTTP status = \$STATUS"
                      if echo "\$STATUS" | grep -Eq '^[23][0-9][0-9]\$'; then
                          echo "Temp container is healthy!"
                          HEALTHY=1
                          break
                      fi
                      sleep 3
                  done

                  if [ "\$HEALTHY" -ne 1 ]; then
                      echo "=== DEBUG: Temp container logs ==="
                      docker logs --tail 200 ${TEMP_CONTAINER} || true
                      echo "Temp container failed health check on port ${TEMP_PORT}"
                      docker rm -f ${TEMP_CONTAINER} || true
                      exit 1
                  fi

                  echo "Stopping old main container (if exists)..."
                  docker rm -f ${MAIN_CONTAINER} || true

                  echo "Starting new main container on port ${MAIN_PORT}..."
                  docker run -d --name ${MAIN_CONTAINER} -p ${MAIN_PORT}:3000 frontend:${IMAGE_TAG}

                  echo "Cleaning up temp container..."
                  docker rm -f ${TEMP_CONTAINER} || true

                  echo "Deployment completed successfully!"
                """
            }
        }
    }
}
