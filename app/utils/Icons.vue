<script setup lang="ts">
interface Props {
  name: string;
  size?: number | string;
  color?: string;
  isWishlisted?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 18,
  color: "currentColor",
  isWishlisted: false,
});
</script>

<template>
  <svg
    v-if="name === 'eye-off'"
    :width="size"
    :height="size"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ color }"
  >
    <path
      d="M8.86328 4.9202L11.44 7.49689L11.4522 7.36192C11.4522 6.00812 10.352 4.90793 8.99825 4.90793L8.86328 4.9202Z"
      fill="currentColor"
    />

    <path
      d="M8.99795 3.27186C11.2556 3.27186 13.0879 5.10418 13.0879 7.36185C13.0879 7.88946 12.9816 8.39253 12.7976 8.85468L15.1902 11.2473C16.4254 10.2166 17.3988 8.88332 18 7.36185C16.5808 3.77086 13.092 1.22688 8.99798 1.22688C7.85278 1.22688 6.75669 1.43137 5.73828 1.79947L7.50515 3.56224C7.96727 3.38229 8.47034 3.27186 8.99795 3.27186Z"
      fill="currentColor"
    />

    <path
      d="M0.817983 1.04294L2.68301 2.90798L3.05521 3.28018C1.70552 4.33539 0.638037 5.73827 0 7.36196C1.41515 10.953 4.90798 13.4969 8.99797 13.4969C10.2659 13.4969 11.4765 13.2515 12.5849 12.8057L12.9326 13.1534L15.317 15.5419L16.36 14.5031L1.86093 0L0.817983 1.04294ZM5.34153 5.56238L6.60533 6.82619C6.56852 7.00207 6.54398 7.17791 6.54398 7.36196C6.54398 8.71576 7.64417 9.81595 8.99797 9.81595C9.18202 9.81595 9.3579 9.79141 9.52968 9.7546L10.7935 11.0184C10.2495 11.2883 9.64421 11.452 8.99797 11.452C6.7403 11.452 4.90798 9.61963 4.90798 7.36196C4.90798 6.71576 5.07159 6.11043 5.34153 5.56238Z"
      fill="currentColor"
    />
  </svg>

  <svg
    v-if="name === 'eye'"
    :width="size"
    :height="size"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ color }"
  >
    <path
      d="M8.99797 3.27186C5.13294 3.27186 1.83242 5.73827 0 7.36196C1.83242 8.98565 5.13294 11.452 8.99797 11.452C12.863 11.452 16.1635 8.98565 18 7.36196C16.1635 5.73827 12.863 3.27186 8.99797 3.27186Z"
      fill="currentColor"
    />

    <path
      d="M8.99797 4.90793C7.64417 4.90793 6.54398 6.00812 6.54398 7.36196C6.54398 8.7158 7.64417 9.81599 8.99797 9.81599C10.3518 9.81599 11.452 8.7158 11.452 7.36196C11.452 6.00812 10.3518 4.90793 8.99797 4.90793Z"
      fill="white"
    />

    <path
      d="M8.99797 6.13482C8.31903 6.13482 7.77083 6.68302 7.77083 7.36196C7.77083 8.0409 8.31903 8.5891 8.99797 8.5891C9.67691 8.5891 10.2251 8.0409 10.2251 7.36196C10.2251 6.68302 9.67691 6.13482 8.99797 6.13482Z"
      fill="currentColor"
    />
  </svg>

  <svg
    v-if="name === 'arrowRight'"
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.28318 0.221294L6.28318 5.22129C6.3531 5.29097 6.40857 5.37377 6.44643 5.46493C6.48428 5.55609 6.50377 5.65383 6.50377 5.75254C6.50377 5.85126 6.48428 5.94899 6.44643 6.04016C6.40857 6.13132 6.3531 6.21412 6.28318 6.28379L1.28318 11.2838C1.14228 11.4247 0.951183 11.5038 0.751926 11.5038C0.552669 11.5038 0.361572 11.4247 0.220676 11.2838C0.0797797 11.1429 0.000625142 10.9518 0.000625142 10.7525C0.000625143 10.5533 0.0797797 10.3622 0.220676 10.2213L4.69005 5.75192L0.220051 1.28255C0.0791551 1.14165 1.25847e-07 0.950553 1.28223e-07 0.751295C1.30599e-07 0.552037 0.0791552 0.360941 0.220051 0.220045C0.360948 0.0791493 0.552044 -7.62281e-06 0.751301 -7.62044e-06C0.950559 -7.61806e-06 1.14166 0.0791493 1.28255 0.220045L1.28318 0.221294Z"
      fill="black"
      fill-opacity="0.6"
    />
  </svg>

  <svg
    v-if="name === 'check'"
    :width="size"
    :height="size"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  <svg
    v-if="name === 'crossIcon'"
    :width="size"
    :height="size"
    :style="{ color }"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <defs>
        <path
          id="cross-a"
          d="M0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 C0.683417511,-0.0976310729 1.31658249,-0.0976310729 1.70710678,0.292893219 L9.70710678,8.29289322 C10.0976311,8.68341751 10.0976311,9.31658249 9.70710678,9.70710678 C9.31658249,10.0976311 8.68341751,10.0976311 8.29289322,9.70710678 L0.292893219,1.70710678 Z"
        ></path>
        <path
          id="cross-c"
          d="M3.58578644,5 L0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 C0.683417511,-0.0976310729 1.31658249,-0.0976310729 1.70710678,0.292893219 L5,3.58578644 L8.29289322,0.292893219 C8.68341751,-0.0976310729 9.31658249,-0.0976310729 9.70710678,0.292893219 C10.0976311,0.683417511 10.0976311,1.31658249 9.70710678,1.70710678 L6.41421356,5 L9.70710678,8.29289322 C10.0976311,8.68341751 10.0976311,9.31658249 9.70710678,9.70710678 C9.31658249,10.0976311 8.68341751,10.0976311 8.29289322,9.70710678 L5,6.41421356 L1.70710678,9.70710678 C1.31658249,10.0976311 0.683417511,10.0976311 0.292893219,9.70710678 C-0.0976310729,9.31658249 -0.0976310729,8.68341751 0.292893219,8.29289322 L3.58578644,5 Z"
        ></path>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(8 6)">
          <mask id="cross-b" fill="#ffffff">
            <use xlink:href="#cross-a"></use>
          </mask>
        </g>
        <g transform="rotate(-90 12 5)">
          <mask id="cross-d" fill="#ffffff">
            <use xlink:href="#cross-c"></use>
          </mask>
          <use fill="#000000" fill-rule="nonzero" xlink:href="#cross-c"></use>
          <g fill="#000000" mask="url(#cross-d)">
            <rect width="24" height="24" transform="translate(-7 -7)"></rect>
          </g>
        </g>
      </g>
    </g>
  </svg>

  <svg
    v-if="name === 'searchIcon'"
    :width="size"
    :height="size"
    :style="{ color }"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
        fill="#0F0F0F"
      ></path>
    </g>
  </svg>

  <svg
    :width="size"
    :height="size"
    :style="{ color }"
    v-if="name === 'filtersIcon'"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
  >
    <g stroke="currentColor" stroke-width="6" stroke-linecap="round">
      <!-- Left slider -->
      <line x1="16" y1="10" x2="16" y2="54" />
      <line x1="11" y1="32" x2="21" y2="32" />

      <!-- Center slider -->
      <line x1="32" y1="10" x2="32" y2="54" />
      <line x1="27" y1="23" x2="37" y2="23" />

      <!-- Right slider -->
      <line x1="48" y1="10" x2="48" y2="54" />
      <line x1="43" y1="32" x2="53" y2="32" />
    </g>
  </svg>

  <svg
    :width="size"
    :height="size"
    :style="{ color }"
    v-if="name === 'cartsIcon'"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>

  <svg
    v-if="name === 'heartIcon'"
    :width="size"
    :height="size"
    :style="{ color }"
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>

  <svg
    v-if="name === 'wishlistIcon'"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    class="cursor-pointer transition-colors"
    :class="
      isWishlisted
        ? 'text-red-500 fill-red-500'
        : 'text-gray-700 fill-none stroke-current stroke-2'
    "
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
</template>
