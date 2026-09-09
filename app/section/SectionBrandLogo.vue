<script setup lang="ts">
import Container from '~/components/ui/Container.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import LazyImage from '~/components/ui/LazyImage.vue';

interface BrandLogoItem {
  image: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const brandLogos: BrandLogoItem[] = [
  {
    image: "/versace.png",
    alt: "Versace Image",
    width: 166,
    height: 33,
    className: "w-[116px] tablet:w-[166px] h-auto object-contain",
  },
  {
    image: "/zara.png",
    alt: "Zara Image",
    width: 91,
    height: 38,
    className: "w-[63px] tablet:w-[91px] h-auto object-contain",
  },
  {
    image: "/gucci.png",
    alt: "Gucci Image",
    width: 156,
    height: 36,
    className: "w-[109px] tablet:w-[156px] h-auto object-contain",
  },
  {
    image: "/prada.png",
    alt: "Prada Image",
    width: 194,
    height: 32,
    className: "w-[127px] tablet:w-[194px] h-auto object-contain",
  },
  {
    image: "/calvin_klein.png",
    alt: "Calvin Klein Image",
    width: 207,
    height: 33,
    className: "w-[134px] tablet:w-[207px] h-auto object-contain",
  },
];
</script>

<template>
  <MainContainer
    data-testid="section-brand-logo"
    class="bg-[#000]"
  >
    <Container class="bg-[#000] !py-0">
      <div
        class="flex laptop:px-[100px] px-[16px] flex-wrap items-center justify-center gap-x-[34px] gap-y-[20px] py-[39px] laptop:justify-between laptop:py-[42px] desktop:gap-x-[106px]"
      >
        <LazyImage
          v-for="logo in brandLogos"
          :key="logo.image"
          :src="logo.image"
          :alt="logo.alt"
          :width="logo.width ?? 160"
          :height="logo.height ?? 38"
          :class="
            logo.className ??
            'h-[38px] max-w-[120px] object-contain tablet:max-w-[160px]'
          "
        />
      </div>
    </Container>
  </MainContainer>
</template>
