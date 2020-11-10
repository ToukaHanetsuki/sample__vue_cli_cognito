import { Vue, Emit, Prop, Component } from 'vue-property-decorator';

@Component
export class InternalValueMixin extends Vue {
  @Prop({ required: true }) private value!: string;

  @Emit() private input(newVal: string): string {
    return newVal;
  }

  protected get internalValue(): string {
    return this.value;
  }

  protected set internalValue(newVal: string) {
    if (this.value !== newVal) this.input(newVal);
  }
}
