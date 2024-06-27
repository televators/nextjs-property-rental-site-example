import { Schema, model, models } from 'mongoose';
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

const MessageSchema = new Schema( {
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: {
      validator: ( value ) => isEmail( value ),
      message: 'Email is not valid.',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: ( value ) => isMobilePhone( value , ['en-US']),
      message: 'Phone number must be a valid US phone number.'
    }
  },
  body: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
} );

const Message = models.Message || model( 'Message', MessageSchema );

export default Message;
