import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity
} from "react-native";

export default class App extends Component {
  state = {
    calculationText: "",
    resultText: "",
    operations: ["DEL", "+", "-", "*", "/"]
  };

  calculateResult() {
    text = this.state.calculationText;
    console.log(text, eval(text));
    this.setState({
      resultText: eval(text)
    });

    // this console.log(text) will show "24+5" if you type "24+5=" in the calculator.
    // console.log(eval(text)) --> to see if the calculations are made in the console
  }
  operate(operation) {
    switch (operation) {
      //Use the switch statement to select one of many code blocks to be executed.

      case "DEL":
        let text = this.state.calculationText.split("");
        //let's say I type "36" --> the split method will transform the strings into an array of strings! ["3","6"]

        text.pop();
        //the pop method will now remove the last element of the array --> "6" and only "3" will remain.

        this.setState({
          calculationText: text.join(""),
          resultText: ""
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        const lastChar = this.state.calculationText.split("").pop();
        if (this.state.operations.indexOf(lastChar) > 0) return;

        if (this.state.calculationText == "") return null;
        else {
          return this.setState({
            calculationText: this.state.calculationText + operation
          });
        }
    }
  }

  validate() {
    // this validate function will be false if the user inputs (Number+Number+=)
    text = this.state.calculationText;
    switch (text.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
        return false;
    }
    return true;
  }

  // updates the state when a button is pressed
  buttonPressed(text) {
    if (text == "=") {
      return this.validate() && this.calculateResult();
    }
    this.setState({
      calculationText: this.state.calculationText + text
    });
  }

  //renders the buttons on the calculator

  render() {
    let allTheRows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, "="]];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.buttonsCalc}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      allTheRows.push(<View style={styles.row}>{row}</View>);
    }

    // this.operations = ["DEL", "+", "-", "*", "/"];
    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.operationsBtnCal}
          onPress={() => this.operate(this.state.operations[i])}
        >
          <Text style={styles.OpsText}>{this.state.operations[i]}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{allTheRows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : 0
  },
  calculationText: {
    fontSize: 30,
    color: "white"
  },
  resultText: {
    fontSize: 40,
    color: "white"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
    // this way the buttons are spaced out evenly
  },
  result: {
    flex: 2,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5
  },

  calculation: {
    flex: 1,
    backgroundColor: "darkblue",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5
  },
  buttons: {
    flex: 6,
    //buttons will take 60% of the height of the screen
    flexDirection: "row"
  },
  buttonsCalc: {
    backgroundColor: "white",
    borderColor: "purple",
    borderWidth: 3,
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  operationsBtnCal: {
    flex: 1,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 30
  },
  OpsText: {
    color: "purple",
    fontSize: 30,
    fontWeight: "700"
  },
  numbers: {
    flex: 3,
    backgroundColor: "dodgerblue"
  },
  operations: {
    backgroundColor: "whitesmoke",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//Use the switch statement to select one of many code blocks to be executed.

//let's say I type "36" --> the split method will transform the strings into an array of strings! ["3","6"
//the pop method will now remove the last element of the array --> "6" and only "3" will remain.
