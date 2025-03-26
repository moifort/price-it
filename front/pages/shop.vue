<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";
import Shop from "~/components/pages/Shop.vue";
import { Run } from "../../back/src/run/validators";
import { Score } from "../../back/src/score/validators";
import type { ProductId } from "../../back/src/shop-product/types";

const { open: openInvoice } = useInvoice();
const { data, status, refresh } = useAsyncGql("ShopQuery");
const confetti = ref(false);
const buy = async (productId: ProductId) => {
	const { shop } = await GqlShopCreateInvoice({ productId });
	const result = await openInvoice(shop.createInvoice);
	if (result === "paid") {
		await new Promise((resolve) => setTimeout(resolve, 1500));
		confetti.value = true;
		await refresh();
	}
};
</script>

<template>
  <ConfettiExplosion
      v-if="confetti"
      :duration="3000"
      :particle-count="300"
      style="position: fixed; top: 0; left: 50%; z-index: 9999"
  />
  <Shop
      :score="status === 'success' ? data.me.score : Score(0)"
      :runs-left="status === 'success' ? data.me.runs.remaining : Run(0)"
      :products="status === 'success' ? data.shop.products :  []"
      :buy="buy"
  />
</template>

