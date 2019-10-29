customElements.whenDefined('card-tools').then(() => {
  let cardTools = customElements.get('card-tools');
  const HaCard = customElements.get('ha-card');

  const oldStyles = HaCard.styles;

  console.log(oldStyles)

  function render() {
    const retval = cardTools.LitHtml`
    <slot></slot>
    <style>
    :host ::slotted(.header-icon) {
      float: left;
      padding: 26px 8px 16px 26px;
    }
    .header-icon {
      padding-left:8px;
      padding-bottom: 4px;
      padding-right: 16px;
    }
    </style>
    ${this.header
      ? cardTools.LitHtml`
        <div class="card-header">${this.header}</div>
        `
      : cardTools.LitHtml``}
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
