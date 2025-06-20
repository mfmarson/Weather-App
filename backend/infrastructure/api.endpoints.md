{
  "openapi" : "3.0.1",
  "info" : {
    "title" : "weather-app-api",
    "version" : "2025-06-20 17:22:45UTC"
  },
  "servers" : [ {
    "url" : "https://ri6kcctu7e.execute-api.us-east-2.amazonaws.com/{basePath}",
    "variables" : {
      "basePath" : {
        "default" : ""
      }
    }
  } ],
  "paths" : {
    "/weather" : {
      "x-amazon-apigateway-any-method" : {
        "responses" : {
          "default" : {
            "description" : "Default response for ANY /weather"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:weather-app-api/invocations",
          "connectionType" : "INTERNET"
        }
      }
    },
    "/auth/verify" : {
      "get" : {
        "responses" : {
          "default" : {
            "description" : "Default response for GET /auth/verify"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
          "connectionType" : "INTERNET"
        }
      }
    },
    "/test" : {
      "get" : {
        "responses" : {
          "default" : {
            "description" : "Default response for GET /test"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
          "connectionType" : "INTERNET"
        }
      }
    },
    "/auth/{proxy+}" : {
      "options" : {
        "responses" : {
          "default" : {
            "description" : "Default response for OPTIONS /auth/{proxy+}"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
          "connectionType" : "INTERNET"
        }
      },
      "parameters" : [ {
        "name" : "proxy+",
        "in" : "path",
        "description" : "Generated path parameter for proxy+",
        "required" : true,
        "schema" : {
          "type" : "string"
        }
      } ]
    },
    "/auth/login" : {
      "post" : {
        "responses" : {
          "default" : {
            "description" : "Default response for POST /auth/login"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
          "connectionType" : "INTERNET"
        }
      }
    },
    "/auth/register" : {
      "post" : {
        "responses" : {
          "default" : {
            "description" : "Default response for POST /auth/register"
          }
        },
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
          "connectionType" : "INTERNET"
        }
      }
    }
  },
  "components" : {
    "x-amazon-apigateway-integrations" : {
      "unusedIntegration_w2xq0tc" : {
        "payloadFormatVersion" : "2.0",
        "type" : "aws_proxy",
        "httpMethod" : "POST",
        "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
        "connectionType" : "INTERNET"
      },
      "unusedIntegration_xumosj3" : {
        "payloadFormatVersion" : "2.0",
        "type" : "aws_proxy",
        "httpMethod" : "POST",
        "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
        "connectionType" : "INTERNET"
      },
      "unusedIntegration_k6r3bog" : {
        "payloadFormatVersion" : "2.0",
        "type" : "aws_proxy",
        "httpMethod" : "POST",
        "uri" : "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:756160874759:function:UserAuthentication/invocations",
        "connectionType" : "INTERNET"
      }
    }
  },
  "x-amazon-apigateway-importexport-version" : "1.0"
}