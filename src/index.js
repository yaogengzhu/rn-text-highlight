import React from "react";
import { Text } from "react-native";
import propTypes from "prop-types";

const RnTextHighlight = (props) => {
  const { originText, keyword, keywordStyle, textStyle } = props;

  const markKeyWords = () => {
    if (!keyword || keyword.length === 0) {
      return <Text>{originText}</Text>;
    }
    const regStr = keyword.split("").reduce((str, item, index) => {
      if (index === keyword.length - 1) {
        return (str += `(${item})`);
      } else {
        return (str += `(${item})|`);
      }
    }, "");

    const reg = new RegExp(regStr);
    const strArr = originText.split(reg);
    return strArr.map((item, index) => {
      if (item) {
        if (keyword.includes(item)) {
          return <Text style={keywordStyle} key={index}>{item}</Text>;
        } else {
          return <Text key={index}>{item}</Text>;
        }
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Text style={textStyle}>{markKeyWords()}</Text>
    </>
  );
};

export default RnTextHighlight;

RnTextHighlight.propTypes = {
  originText: propTypes.string,
  keyword: propTypes.string,
  keywordStyle: propTypes.object,
  textStyle: propTypes.object,
};

RnTextHighlight.defaultProps = {
  originText: "",
  keyword: "",
  textStyle: {},
  keywordStyle: {
    color: "#f40",
  },
};
