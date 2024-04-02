import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types  } from 'mongoose';
import { Address } from './address.schema';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
