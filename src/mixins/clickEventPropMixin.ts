import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export class clickEventPropMixin extends Vue {
  @Prop({ required: true }) protected clickEvent!: (e?: Event) => Promise<unknown>;
}
