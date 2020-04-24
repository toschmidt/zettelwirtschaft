import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Label } from '@zettelwirtschaft/types';
import { ObjectId } from 'bson';

@Service()
export class LabelService {
  constructor(@Inject(Label) private labelModel: MongooseModel<Label>) {}

  async find(): Promise<Label[]> {
    return this.labelModel.find().exec();
  }

  async findById(labelId: ObjectId): Promise<Label> {
    return (await this.labelModel.findById(labelId).exec())!;
  }

  createLabel(label: Label): Promise<Label> {
    label._id = undefined;
    return new this.labelModel(label).save();
  }

  async updateLabel(labelId: ObjectId, label: Label): Promise<Label> {
    const oldLabel = await this.labelModel.findById(labelId).exec();

    oldLabel!.name = label.name;
    oldLabel!.description = label.description;

    return oldLabel!.save();
  }

  async deleteLabel(labelId: ObjectId): Promise<void> {
    await this.labelModel.findByIdAndDelete(labelId).exec();
  }
}
