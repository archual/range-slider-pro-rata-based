import "./scss/main.scss";

$(document).ready(() => {
  const sliders = [
    {
      value: 100,
      spent: 20,
      min: "0",
      max: "200"
    },
    {
      value: 200,
      spent: 0,
      min: "0",
      max: "200"
    },
    {
      value: 50,
      spent: 50,
      min: "0",
      max: "200"
    }
  ];

  function initSliders(sliders) {
    sliders.forEach((slider, index) => {
      const sliderHtml = $(`
          <div class="slidecontainer">
            <input
              id="ch-${index}"
              type="range"
              min="${slider.min}"
              max="${currentBudget}"
              value="50"
              class="slider"
            />
            <span id="ch-o-${index}" class="value"></span>
          </div>`);

      $("#sliders")[0].appendChild(sliderHtml[0]);
    });

    return sliders.map((slider, index) => {
      let updatedSlider = { ...{}, ...{ slider } };
      updatedSlider.el = document.getElementById(`ch-${index}`);
      updatedSlider.outputEl = document.getElementById(`ch-o-${index}`);
      updatedSlider.outputEl.innerHTML = updatedSlider.el.value;
      updatedSlider.el.oninput = function() {
        const newValue = validate(this.value, index);
        updatedSlider.outputEl.innerHTML = this.value;
      };
    });
  }

  const currentBudget = $("#current-budget")[0].value;
  const newBudget = $("#new-budget")[0].value;

  //   const maxRange = Math.ceil(currentBudget / sliders.length);

  const inicializedSliders = initSliders(sliders, currentBudget);

  function validate(value, index) {
    console.log(index);
    sliders[index].value = value;

    // logic
    return value;
  }
});
