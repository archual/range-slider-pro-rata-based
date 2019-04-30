import "./scss/main.scss";

$(document).ready(() => {
  const channels = {
    currentBudget: $("#current-budget")[0],
    newBudget: $("#new-budget")[0],
    sliders: [
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
        spent: 40,
        min: "0",
        max: "200"
      }
    ],

    initSliders: function(sliders) {
      $("#sliders")[0].innerHTML = "";

      sliders.forEach((slider, index) => {
        const sliderHtml = $(`
            <div class="slidecontainer">
              <input
                id="ch-${index}"
                type="range"
                min="${slider.spent || 0}"
                max="${this.currentBudget.value}"
                value="${slider.value}"
                class="slider"
              />
              <span id="ch-s-${index}" class="value"></span>
              <span id="ch-o-${index}" class="value"></span>
            </div>`);

        $("#sliders")[0].appendChild(sliderHtml[0]);
      });

      return sliders.map((slider, index) => {
        let updatedSlider = { ...{}, ...{ slider } };
        updatedSlider.el = document.getElementById(`ch-${index}`);
        updatedSlider.outputEl = document.getElementById(`ch-o-${index}`);
        updatedSlider.spentEl = document.getElementById(`ch-s-${index}`);
        updatedSlider.outputEl.innerHTML = updatedSlider.el.value;
        updatedSlider.spentEl.innerHTML = this.sliders[index].spent;
        updatedSlider.el.oninput = e => {
          this.sliders[index].value = e.currentTarget.value;
          updatedSlider.outputEl.innerHTML = e.currentTarget.value;
        };
      });
    },

    newValues: function(newValue) {
      const currentBudgetValue = this.currentBudget.value;
      const newBudgetValue = newValue.currentTarget.value;

      if (newBudgetValue > currentBudgetValue) {
        const newValues = this.sliders.forEach(slider => {
          const newVal = (slider.value / currentBudgetValue) * newBudgetValue;
          slider.value = newVal;
        });
      } else {
        const newValues = this.sliders.forEach(slider => {
          const newVal =
            ((slider.value - slider.spent) / currentBudgetValue) *
            newBudgetValue;
          slider.value = newVal < slider.spent ? slider.spent : newVal;
        });
      }

      this.currentBudget.value = newValue.currentTarget.value;
      this.initSliders(this.sliders);
    }
  };

  //   const maxRange = Math.ceil(currentBudget / sliders.length);

  const inicializedSliders = channels.initSliders(channels.sliders);

  channels.newBudget.oninput = channels.newValues.bind(channels);
});
