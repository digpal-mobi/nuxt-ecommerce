<script setup lang="ts">
import Button from '~/components/ui/Button.vue';
import Container from '~/components/ui/Container.vue';
import LazyImage from '~/components/ui/LazyImage.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import Paragraph from '~/components/ui/Paragraph.vue';
import TitleTag from '~/components/ui/TitleTag.vue';

const metrics = [
  { number: "200+", description: "International Brands" },
  { number: "2,000+", description: "High-Quality Products" },
  { number: "30,000+", description: "Happy Customers" },
];
</script>
<template>
  <section
    data-testid="section-main-banner"
    class="relative overflow-hidden bg-[#F2F0F1]"
  >
    <div
      class="hidden laptop:absolute laptop:right-[5%] laptop:bottom-0 laptop:block laptop:h-full laptop:w-[48%]"
    >
      <LazyImage
        src="/banner-image.png"
        alt="Banner"
        width="900"
        height="700"
        class="h-full w-full object-contain object-right-bottom"
      />
      <div class="absolute right-[1.5%] top-[12.8%]">
        <Icon
          name="sparkle-2"  
          class="laptop:h-auto laptop:w-[104px] w-[76px]"
        />
      </div>
      <div class="absolute left-[10.5%] top-[44.5%]">
        <Icon name="sparkle" />
      </div>
    </div>
    <MainContainer>
      <Container class="laptop:!pt-[83px] laptop:!pb-[114px]   laptop:px-[100px] px-[16px]">
        <div class="relative z-10 flex min-h-[50%] items-center">
          <div class="w-full laptop:max-w-[52%]">
            <TitleTag
              as="h1"
              variant="mainHeading"
              class="!pt-[31px] !text-[36px] !leading-[34px] laptop:!pt-0 laptop:!text-[48px] laptop:!leading-[64px] desktop:!text-[64px]"
            >
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </TitleTag>
            <Paragraph
              variant="normalPara"
              class="mt-[14px] !w-full !text-[14px] !leading-[21px] text-[#000000]/60 laptop:!mt-[24px] laptop:!w-[87%] laptop:!text-[16px] laptop:!leading-[24px]"
            >
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </Paragraph>
            <div
              class="mt-[16px] flex max-w-full justify-center desktop:!mt-[25px] tablet:!max-w-[210px] tablet:justify-start"
            >
              <NuxtLink
                to="/shop"
                class="w-full"
                aria-label="Shop now for our clothing collection"
              >
                <Button class="w-full" variant="primary"> Shop Now </Button>
              </NuxtLink>
            </div>
            <div class="mt-[27px] flex flex-wrap desktop:!mt-[55px]">
              <template
                v-for="(item, index) in metrics"
                :key="item.description"
              >
                <div
                  :class="
                    index === 2
                      ? 'mt-[17px] flex w-full items-center justify-center pl-[5px] laptop:mt-0 laptop:w-auto laptop:pl-0'
                      : 'flex w-[48%] items-center justify-center laptop:w-auto'
                  "
                >
                  <div
                    :class="
                      index === 0
                        ? 'w-full pl-[42px] laptop:pr-[32px] laptop:pl-0'
                        : index === metrics.length - 1
                          ? 'pl-0 laptop:pl-[35px]'
                          : 'w-full pl-[30px] laptop:pr-[26px] laptop:pl-[33px]'
                    "
                  >
                    <TitleTag
                      as="span"
                      variant="satoshiBold"
                      class="block text-[24px] font-bold leading-none laptop:text-[40px]"
                    >
                      {{ item.number }}
                    </TitleTag>
                    <Paragraph
                      variant="normalPara"
                      class="!mt-0 !text-[12px] text-[#000000]/60 laptop:!mt-[5px] laptop:!text-[16px]"
                    >
                      {{ item.description }}
                    </Paragraph>
                  </div>
                </div>
                <div
                  v-if="index !== metrics.length - 1"
                  class="hidden h-14 w-px bg-black/10 laptop:block"
                />
              </template>
            </div>
          </div>
        </div>
      </Container>
    </MainContainer>
    <div class="relative laptop:hidden">
      <LazyImage
        src="/banner-mob-image.png"
        alt="Banner"
        width="700"
        height="448"
        class="h-[448px] w-full overflow-hidden object-contain object-bottom"
      />
      <div class="absolute right-[5%] top-[7%]">
        <Icon name="sparkle-2" class="w-[76px] h-auto laptop:w-[104px]" />
      </div>
      <div class="absolute left-[7%] top-[28.7%]">
        <Icon name="sparkle" class="w-[44px] h-auto laptop:w-[76px]" />
      </div>
    </div>
  </section>
</template>
