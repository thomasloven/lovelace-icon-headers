customElements.whenDefined('card-tools').then(() => {
  let cardTools = customElements.get('card-tools');
  const HaCard = customElements.get('ha-card');

  const oldStyles = HaCard.styles;

  console.log(oldStyles)

  function render() {
    const retval = cardTools.LitHtml`
    <style>
    :host ::slotted(.header-icon) {
      float: left;
      padding: 8px;
      margin: 18px 0 8px 18px;
      --iron-icon-width: 88px;
      --iron-icon-height: 88px;
      margin-top: -20px;
      box-shadow: var( --ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) );
      background: var(--ha-card-background, white);
      border-radius: var(--ha-card-border-radius, 2px);
    }
    .header-icon {
      padding: 8px;
      margin-right: 8px;
      --iron-icon-width: 88px;
      --iron-icon-height: 88px;
      margin-top: -50px;
      box-shadow: var( --ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) );
      background: var(--ha-card-background, white);
      border-radius: var(--ha-card-border-radius, 2px);
    }
    </style>
    ${this.header
      ? cardTools.LitHtml`
        <div class="card-header">${this.header}</div>
        `
      : cardTools.LitHtml``}
    <slot></slot>
    `;
    return retval;
  }

  function updated() {
    const getConfig = (node) => {
      if(node.config)
        return node.config;
      if(node._config)
        return node._config;
      if(node.host)
        return getConfig(node.host);
      if(node.parentElement)
        return getConfig(node.parentElement);
      if(node.parentNode)
        return getConfig(node.parentNode);
      return null;
    };

    const config = getConfig(this);
    if(!config) return;
    if(!config.card_icon) return;

    this.style.overflow = "visible";

    this.style.marginTop = "32px";

    const icon = document.createElement("ha-icon");
    icon.icon = config.card_icon;
    icon.className = 'header-icon';
    let root = this;
    if(this.header)
      root = this.shadowRoot.querySelector(".card-header");
    root.insertBefore(icon, root.firstChild);
  }

  HaCard.prototype.render = render;
  HaCard.prototype.firstUpdated = updated;

  cardTools.fireEvent('ll-rebuild', {});
});
