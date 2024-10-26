<template>
  <div class="whitespace-pre-wrap">

    <UAccordion variant="soft" color="gray" :items="items">
      <template #item="{ item }">
        <div class="px-2 pb-2 space-y-4 text-sm">
          <p>
            {{ item.description }}
          </p>
        </div>
      </template>

      <template #card>
        <div class="px-2 pb-2 space-y-4 text-sm">
          <p>
            {{ t("rules.card.content") }}
          </p>

          <div class="flex gap-2 justify-center">
            <Card color="red" :number="1" />
            <Card color="blue" :number="7" />
            <Card color="yellow" :number="8" />
            <Card color="black" :number="13" />
          </div>
        </div>
      </template>

      <template #joker>
        <div class="px-2 pb-2 space-y-4 text-sm">
          <p>
            {{ t("rules.joker.content") }}
          </p>

          <div class="flex gap-2 justify-center">
            <Card color="red" :number="0" />
            <Card color="black" :number="0" />
          </div>
        </div>
      </template>

      <template #suite>
        <div class="px-2 pb-2 space-y-4 text-sm">
          <p>
            {{ t("rules.suite.content") }}
          </p>

          <div class="flex gap-2 justify-center">
            <Combination disabled :combination="suiteExample" />
          </div>
        </div>
      </template>

      <template #serie>
        <div class="px-2 pb-2 space-y-4 text-sm">
          <p>
            {{ t("rules.serie.content") }}
          </p>

          <div class="flex gap-2 justify-center">
            <Combination disabled :combination="serieExample" />
          </div>
        </div>
      </template>

      <template #first_turn>
        <div class="px-2 pb-2 space-y-4 text-sm">
          <p>
            {{ t("rules.first_turn.content") }}
          </p>

          <p>
            {{ t("rules.first_turn.examples.title") }}
          </p>

          <div class="flex flex-col items-center">
            <Combination disabled :combination="invalidStartupExample" />
            <p class="text-center text-xs">
              {{ t("rules.first_turn.examples.invalid") }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <Combination disabled :combination="validStartupExample" />
            <p class="text-center text-xs">
              {{ t("rules.first_turn.examples.valid") }}
            </p>
          </div>
        </div>
      </template>

      <template #combination_modification>
        <div class="px-2 pb-2 space-y-4 text-sm">
          <p>
            {{ t("rules.combination_modification.content") }}
          </p>

          <p>
            {{ t("rules.combination_modification.examples.title") }}
          </p>

          <div class="flex flex-col items-center">
            <Combination disabled :combination="serieExample" />
            <p class="text-center text-xs">
              {{ t("rules.combination_modification.examples.add") }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <Combination disabled :combination="removeExample" />
            <p class="text-center text-xs">
              {{ t("rules.combination_modification.examples.remove") }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <Combination disabled :combination="replaceExample" />
            <p class="text-center text-xs">
              {{ t("rules.combination_modification.examples.replace") }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <Combination disabled :combination="splitExample" />
            <p class="text-center text-xs">
              {{ t("rules.combination_modification.examples.split") }}
            </p>
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
import type { CombinationDto } from "@/app/Combination/domain/dtos/combination";
import type { GameRule } from "@/utils/types/gamerule";

const props = withDefaults(
  defineProps<{
    defaultOpen?: GameRule;
  }>(),
  {
    defaultOpen: "purpose"
  }
);

const { t } = useI18n();
const items = [
  {
    label: t("rules.purpose.title"),
    description: t("rules.purpose.content"),
    defaultOpen: props.defaultOpen === "purpose"
  },
  {
    label: t("rules.card.title"),
    slot: "card",
    defaultOpen: props.defaultOpen === "card"
  },
  {
    label: t("rules.joker.title"),
    slot: "joker",
    defaultOpen: props.defaultOpen === "joker"
  },
  {
    label: t("rules.suite.title"),
    slot: "suite",
    defaultOpen: props.defaultOpen === "suite"
  },
  {
    label: t("rules.serie.title"),
    slot: "serie",
    defaultOpen: props.defaultOpen === "serie"
  },
  {
    label: t("rules.first_turn.title"),
    slot: "first_turn",
    defaultOpen: props.defaultOpen === "first_turn"
  },
  {
    label: t("rules.turn.title"),
    description: t("rules.turn.content"),
    defaultOpen: props.defaultOpen === "turn"
  },
  {
    label: t("rules.combination_modification.title"),
    slot: "combination_modification",
    defaultOpen: props.defaultOpen === "combination_modification"
  }
];

const suiteExample = {
  type: "suite",
  cards: [
    {
      color: "red",
      number: 11,
      duplicata: 1
    },
    {
      color: "red",
      number: 12,
      duplicata: 1
    },
    {
      color: "red",
      number: 13,
      duplicata: 1
    }
  ]
} as CombinationDto;

const serieExample = {
  type: "serie",
  cards: [
    {
      color: "red",
      number: 11,
      duplicata: 1
    },
    {
      color: "blue",
      number: 11,
      duplicata: 1
    },
    {
      color: "yellow",
      number: 11,
      duplicata: 1
    }
  ]
} as CombinationDto;

const invalidStartupExample = {
  type: "serie",
  cards: [
    {
      color: "red",
      number: 9,
      duplicata: 1
    },
    {
      color: "blue",
      number: 9,
      duplicata: 1
    },
    {
      color: "yellow",
      number: 9,
      duplicata: 1
    }
  ]
} as CombinationDto;

const validStartupExample = {
  type: "serie",
  cards: [
    {
      color: "red",
      number: 11,
      duplicata: 1
    },
    {
      color: "blue",
      number: 11,
      duplicata: 1
    },
    {
      color: "yellow",
      number: 11,
      duplicata: 1
    }
  ]
} as CombinationDto;

const removeExample = {
  type: "suite",
  cards: [
    {
      color: "red",
      number: 10,
      duplicata: 1
    },
    {
      color: "red",
      number: 11,
      duplicata: 1
    },
    {
      color: "red",
      number: 12,
      duplicata: 1
    },
    {
      color: "red",
      number: 13,
      duplicata: 1
    }
  ]
} as CombinationDto;

const replaceExample = {
  type: "suite",
  cards: [
    {
      color: "yellow",
      number: 3,
      duplicata: 1
    },
    {
      color: "black",
      number: 0,
      duplicata: 1
    },
    {
      color: "yellow",
      number: 5,
      duplicata: 1
    }
  ]
} as CombinationDto;

const splitExample = {
  type: "suite",
  cards: [
    {
      color: "black",
      number: 5,
      duplicata: 1
    },
    {
      color: "black",
      number: 6,
      duplicata: 1
    },
    {
      color: "black",
      number: 7,
      duplicata: 1
    },
    {
      color: "black",
      number: 8,
      duplicata: 1
    },
    {
      color: "black",
      number: 9,
      duplicata: 1
    }
  ]
} as CombinationDto;
</script>

