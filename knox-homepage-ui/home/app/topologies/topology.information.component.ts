/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {BsModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {HomepageService} from '../homepage.service';
import {TopologyInformation} from './topology.information';
import {Service} from './service';

@Component({
    selector: 'app-topologies-information',
    templateUrl: './topology.information.component.html',
    styleUrls: ['./topology.information.component.css'],
    providers: [HomepageService]
})

export class TopologyInformationsComponent implements OnInit {

    @ViewChild('apiServiceInformationModal')
    apiServiceInformationModal: BsModalComponent;

    topologies: TopologyInformation[];
    selectedApiService : Service;

    setTopologies(topologies: TopologyInformation[]) {
        this.topologies = topologies;
        for (let topology of topologies) {
            this['showTopology_' + topology.topology] = topology.pinned;
        }
    }

    toggleBoolean(propertyName: string) {
        this[propertyName] = !this[propertyName];
    }

    enableServiceText(enableServiceText: string) {
        this[enableServiceText] = true;
    }

    constructor(private homepageService: HomepageService) {
        this['showTopologies'] = true;
    }

    ngOnInit(): void {
        console.debug('TopologyInformationsComponent --> ngOnInit()');
        this.homepageService.getTopologies().then(topologies => this.setTopologies(topologies));
    }

    openApiServiceInformationModal(apiService: Service) {
        this.selectedApiService = apiService;
        this.apiServiceInformationModal.open('lg');
    }

}
