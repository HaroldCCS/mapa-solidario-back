import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type SurveyUserDocument = HydratedDocument<SurveyUser>;


@Schema()
export class SurveyUser {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SurveyPropertie', required: true })
  propertie: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  value: string;
}

export const SurveyUserSchema = SchemaFactory.createForClass(SurveyUser);