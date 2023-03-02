<script lang="ts">
  import * as accordion from "@zag-js/accordion";
  import { spread, normalizeProps, useMachine } from "../lib/utils";
  let count = 0;
  const test = {
    "data-testid": "idtest",
    onClick: () => count++,
  };
  const accordionData = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const normalizedProps = normalizeProps?.element(test);
  console.log(normalizedProps);

  const [state, send] = useMachine(
    accordion.machine({ id: "1", collapsible: true })
  );
  $: api = accordion.connect($state, send, normalizeProps);
  $: console.log("in", api);
</script>

<p>{count}</p>
<button use:spread={normalizedProps}> increment </button>

<div use:spread={api.rootProps}>
  {#each accordionData as item (item.id)}
    <div use:spread={api.getItemProps({ value: item.id })}>
      <h3>
        <button use:spread={api.getTriggerProps({ value: item.id })}>
          {item.id}
        </button>
      </h3>
      <div use:spread={api.getContentProps({ value: item.id })}>
        {item.label}
      </div>
    </div>
  {/each}
</div>
