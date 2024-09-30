import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;


@Schema()
export class Event {
  @Prop({ required: true})
  name: string;

  @Prop({ required: true})
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  entity: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);