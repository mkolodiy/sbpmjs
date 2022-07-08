import { test, expect } from 'vitest';
import { isSbpmLinkType } from '../src';

test('isSbpmLinkType', () => {
  expect(isSbpmLinkType('ProcessNetwork')).to.be.false;
  expect(isSbpmLinkType('ProcessModel')).to.be.false;
  expect(isSbpmLinkType('Message')).to.be.false;
  expect(isSbpmLinkType('Subject')).to.be.false;
  expect(isSbpmLinkType('SendState')).to.be.false;
  expect(isSbpmLinkType('ReceiveState')).to.be.false;
  expect(isSbpmLinkType('FunctionState')).to.be.false;
  expect(isSbpmLinkType('ProcessTransition')).to.be.true;
  expect(isSbpmLinkType('MessageTransition')).to.be.true;
  expect(isSbpmLinkType('SendStateTransition')).to.be.true;
  expect(isSbpmLinkType('ReceiveStateTransition')).to.be.true;
  expect(isSbpmLinkType('FunctionStateTransition')).to.be.true;
});
