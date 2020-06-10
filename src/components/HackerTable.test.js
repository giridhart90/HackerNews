import React from 'react';
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Spinner, Table } from 'reactstrap';
import HackerTable from './HackerTable';

const mockAdapter = new MockAdapter(axios);

let component;
const flushPromise = () => new Promise(resolve => setImmediate(resolve));

beforEach(() => {
    component = shallow(<HackerTable />);
});

test('Spinner Renders', () => {
    let component = renderer.create(<Spinner />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Hacker Table Renders', () => {
    let component = renderer.create(<Table />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Renders HackerTable', () => {
    expect(component).toMatchSnapshot();
});

test('Renders HackerTable API erorr response', async () => {
    const errorRes = {};
    errorRes.message = 'Error';
    mockAdapter.onGet(`https://hn.algolia.com/api/v1/search?page=1`).reply(500, errorRes);
    component = shallow(<HackerTable />);

    await component.instance().handleAPICall();
    await flushPromise();
    expect(component.state().error).toEqual('Error');
}); 
