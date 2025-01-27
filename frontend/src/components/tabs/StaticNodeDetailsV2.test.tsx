/*
 * Copyright 2021 The Kubeflow Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { testBestPractices } from 'src/TestUtils';
import { CommonTestWrapper } from 'src/TestWrapper';
import { StaticNodeDetailsV2 } from './StaticNodeDetailsV2';
import fs from 'fs';

const V2_PIPELINESPEC_PATH = 'src/data/test/lightweight_python_functions_v2_pipeline_rev.yaml';
const v2YamlTemplateString = fs.readFileSync(V2_PIPELINESPEC_PATH, 'utf8');
const V2_SUBDAG_PIPELINE_PATH = 'src/data/test/pipeline_with_loops_and_conditions.yaml';
const v2YamlSubDagTemplateString = fs.readFileSync(V2_SUBDAG_PIPELINE_PATH, 'utf8');

testBestPractices();

describe('StaticNodeDetailsV2', () => {
  it('Unable to pull node info', async () => {
    render(
      <CommonTestWrapper>
        <StaticNodeDetailsV2
          templateString={''}
          layers={['root']}
          onLayerChange={layers => {}}
          element={{
            data: {
              label: 'train',
            },
            id: 'task.train',
            position: { x: 100, y: 100 },
            type: 'EXECUTION',
          }}
        ></StaticNodeDetailsV2>
      </CommonTestWrapper>,
    );
    screen.getByText('Unable to retrieve node info');
  });
  it('Render Execution node with outputs', async () => {
    render(
      <CommonTestWrapper>
        <StaticNodeDetailsV2
          templateString={v2YamlTemplateString}
          layers={['root']}
          onLayerChange={layers => {}}
          element={{
            data: {
              label: 'preprocess',
            },
            id: 'task.preprocess',
            position: { x: 100, y: 100 },
            type: 'EXECUTION',
          }}
        ></StaticNodeDetailsV2>
      </CommonTestWrapper>,
    );
    screen.getByText('Output Artifacts');
    screen.getByText('output_dataset_one');
    expect(screen.getAllByText('system.Dataset (version: 0.0.1)').length).toEqual(2);

    screen.getByText('Output Parameters');
    screen.getByText('output_bool_parameter_path');
    expect(screen.getAllByText('STRING').length).toEqual(2);

    screen.getByText('Image');
    screen.getByText('python:3.7');

    screen.getByText('Command');
    expect(screen.getAllByText('sh').length).toEqual(2);
    // The yaml file we used in this test has command as follow:
    /* 
      sh
      -c

      if ! [ -x "$(command -v pip)" ]; then
          python3 -m ensurepip || python3 -m ensurepip --user || apt-get install python3-pip
      fi

      PIP_DISABLE_PIP_VERSION_CHECK=1 python3 -m pip install --quiet     --no-warn-script-location 'kfp==2.0.0-beta.5' && "$0" "$@"
      sh
      -ec
      program_path=$(mktemp -d)
      ...
    */
    // Thus, we can find 2 'sh'
    screen.getByText('-c');

    screen.getByText('Arguments');
    screen.getByText(/--executor_input/);
  });
  it('Render Execution node with inputs', async () => {
    render(
      <CommonTestWrapper>
        <StaticNodeDetailsV2
          templateString={v2YamlTemplateString}
          layers={['root']}
          onLayerChange={layers => {}}
          element={{
            data: {
              label: 'train',
            },
            id: 'task.train',
            position: { x: 100, y: 100 },
            type: 'EXECUTION',
          }}
        ></StaticNodeDetailsV2>
      </CommonTestWrapper>,
    );
    screen.getByText('Input Artifacts');
    screen.getByText('dataset_two');
    expect(screen.getAllByText('system.Dataset (version: 0.0.1)').length).toEqual(2);

    screen.getByText('Input Parameters');
    screen.getByText('input_bool');
    screen.getByText('input_dict');
    screen.getByText('input_list');
    screen.getByText('message');
    expect(screen.getAllByText('STRING').length).toEqual(1);

    screen.getByText('Image');
    screen.getByText('python:3.7');

    screen.getByText('Command');
    expect(screen.getAllByText('sh').length).toEqual(2);
    // See the details of 'Render Execution node with outputs' test.
    screen.getByText('-c');

    screen.getByText('Arguments');
    screen.getByText(/--executor_input/);
  });
  it('Render Sub DAG node of root layer', async () => {
    render(
      <CommonTestWrapper>
        <StaticNodeDetailsV2
          templateString={v2YamlSubDagTemplateString}
          layers={['root']}
          onLayerChange={layers => {}}
          element={{
            data: {
              label: 'DAG: condition-1',
            },
            id: 'task.condition-1',
            position: { x: 100, y: 100 },
            type: 'SUB_DAG',
          }}
        ></StaticNodeDetailsV2>
      </CommonTestWrapper>,
    );
    screen.getByText('Open Sub-DAG');

    screen.getByText('pipelinechannel--flip-coin-op-Output');
    expect(screen.getAllByText('STRING').length).toEqual(2);
  });
  it('Render Sub DAG node of sub layer', async () => {
    render(
      <CommonTestWrapper>
        <StaticNodeDetailsV2
          templateString={v2YamlSubDagTemplateString}
          layers={['root', 'condition-1']}
          onLayerChange={layers => {}}
          element={{
            data: {
              label: 'DAG: for-loop-2',
            },
            id: 'task.for-loop-2',
            position: { x: 100, y: 100 },
            type: 'SUB_DAG',
          }}
        ></StaticNodeDetailsV2>
      </CommonTestWrapper>,
    );
    screen.getByText('Open Sub-DAG');

    screen.getByText('pipelinechannel--flip-coin-op-Output');
    expect(screen.getAllByText('STRING').length).toEqual(3);
  });
  it('Render Artifact node', async () => {
    render(
      <CommonTestWrapper>
        <StaticNodeDetailsV2
          templateString={v2YamlTemplateString}
          layers={['root']}
          onLayerChange={layers => {}}
          element={{
            data: {
              label: 'system.Model: model',
            },
            id: 'artifact.train.model',
            position: { x: 100, y: 100 },
            type: 'ARTIFACT',
          }}
        ></StaticNodeDetailsV2>
      </CommonTestWrapper>,
    );
    screen.getByText('Artifact Info');

    screen.getByText('Upstream Task');
    screen.getByText('train');

    screen.getByText('Artifact Name');
    screen.getByText('model');

    screen.getByText('Artifact Type');
    screen.getByText('system.Model (version: 0.0.1)');
  });
});
