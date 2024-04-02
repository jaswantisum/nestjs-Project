import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop()
  address1: string;

  @Prop()
  address2: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  zipCode: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
