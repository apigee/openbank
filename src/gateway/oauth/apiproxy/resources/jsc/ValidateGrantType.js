var grant_type = context.getVariable('request.formparam.grant_type');

if (grant_type && grant_type !== 'authorization_code' && grant_type !== 'client_credentials' &&
      grant_type !== 'refresh_token') {
          context.setVariable('errorResponseCode',400);
          context.setVariable('errorDescription', 'Invalid grant_type ' + grant_type);
          context.setVariable('isError',true);
      }