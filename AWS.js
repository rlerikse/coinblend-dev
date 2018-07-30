import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from 'coinblend-dev/awsmobilejs/#current-backend-info/aws-exports.js';

Amplify.configure(aws_exports);

export { Auth };
