import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["appBar"])
  },
  methods: {
    ...mapMutations(["setAppBar"])
  }
};
