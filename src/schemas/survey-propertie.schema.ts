import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
import { TypeTypeForm } from "src/app/survey-propertie/dto/create-survey-propertie.dto";

export type SurveyPropertieDocument = HydratedDocument<SurveyPropertie>;


@Schema()
export class SurveyPropertie {
  @Prop({ required: true, unique: true})
  propertie: string;

  @Prop({ required: true})
  type_form: TypeTypeForm;

  @Prop({ default: true})
  status: boolean;
}

export const SurveyPropertieSchema = SchemaFactory.createForClass(SurveyPropertie);