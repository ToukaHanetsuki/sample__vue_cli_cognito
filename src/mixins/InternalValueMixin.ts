import { Vue, Emit, Prop, Component } from 'vue-property-decorator';

/**
 * 内部で使えるvalueを追加するmixinコンポーネント
 *
 * mixinしたコンポーネントをv-modelが使えるように拡張する
 */
@Component
export class InternalValueMixin<T> extends Vue {
  @Prop({ required: true }) private value!: T;

  @Emit() private input(newVal: T): T {
    return newVal;
  }

  protected get internalValue(): T {
    return this.value;
  }

  protected set internalValue(newVal: T) {
    if (this.value !== newVal) this.input(newVal);
  }
}
