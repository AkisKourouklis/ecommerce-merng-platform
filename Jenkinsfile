pipeline {
  agent any
  stages {
    stage("build") {
      when {
        expression {
          BRANCH_NAME == 'main' && CODE_CHANGES == true
        }
        steps {
          echo "building the application"
        }
      }
    }
    stage("test") {
      when {
        expression {
          BRANCH_NAME == 'main' && CODE_CHANGES == true
        }
        steps {
          echo "testing the application"
        }
      }
    }
    stage("deploy") {
      when {
        expression {
          BRANCH_NAME == 'main' && CODE_CHANGES == true
        }
        steps {
          echo "doploying the application"
        }
      }
    } 
   
  }
}