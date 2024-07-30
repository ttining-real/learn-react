import { typeIs } from './typeIs';

export const generateCheckType = (type) => (props, propName, componentName) => {
  const propValue = props[propName];
  const propType = typeIs(propValue);
  const allowedType = type;

  if (propType !== allowedType) {
    throw new Error(
      `${componentName} 컴포넌트 ${propName} 속성에 전달 가능한 데이터 타입은 "${allowedType}"이지만, 전달된 타입은 "${propType}"입니다.`
    );
  }
};

export const number = generateCheckType('number');
export const string = generateCheckType('string');
export const bool = generateCheckType('boolean');
export const symbol = generateCheckType('symbol');
export const func = generateCheckType('function');
export const object = generateCheckType('object');
export const array = generateCheckType('array');

export const arrayOf = (list) => {
  return (props, propName, componentName) => {
    const propValue = props[propName];
    const propType = typeIs(propValue);

    const types = list.reduce(
      (types, type, index, list) =>
        types + type + (index < list.length - 1 ? '|' : ''),
      ''
    );

    const matches = new RegExp(`^(${types})$`, 'i');

    if (propType !== 'string' || !matches.test(propValue)) {
      throw new Error(
        `${componentName} 컴포넌트 ${propName} 속성에 전달 가능한 데이터 값은 "[${list.toString()}]"이지만, 전달된 값은 "${propValue}"입니다.`
      );
    }
  };
};

const PropTypes = Object.freeze({
  number,
  string,
  bool,
  symbol,
  func,
  object,
  array,
  arrayOf,
});

export default PropTypes;
