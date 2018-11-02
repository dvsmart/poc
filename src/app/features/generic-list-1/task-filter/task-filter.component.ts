import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@core/animations';

@Component({
  selector: 'task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  animations: fuseAnimations
})
export class GenericFilterComponent implements OnInit {
  filters: any[];
  tags: any[];
  accounts: object;
  selectedAccount: string;
  constructor() {
    this.accounts = {
      'local': 'vj@gmail.com',
      'admin': 'vjdeveloper@gmail.com'
    };
    this.selectedAccount = 'local';
  }

  ngOnInit() {
    this.filters = filters;
    this.tags = tags;
  }

}

export const filters = [
  {
    'id': 0,
    'handle': 'starred',
    'title': 'Starred',
    'icon': 'star'
  },
  {
    'id': 1,
    'handle': 'important',
    'title': 'Priority',
    'icon': 'error'
  },
  {
    'id': 2,
    'handle': 'dueDate',
    'title': 'Sheduled',
    'icon': 'schedule'
  },
  {
    'id': 3,
    'handle': 'today',
    'title': 'Today',
    'icon': 'today'
  },
  {
    'id': 4,
    'handle': 'completed',
    'title': 'Done',
    'icon': 'check'
  },
  {
    'id': 4,
    'handle': 'deleted',
    'title': 'Deleted',
    'icon': 'delete'
  }
];

export const tags = [
  {
    'id': 1,
    'handle': 'frontend',
    'title': 'Frontend',
    'color': '#388E3C'
  },
  {
    'id': 2,
    'handle': 'backend',
    'title': 'Backend',
    'color': '#F44336'
  },
  {
    'id': 3,
    'handle': 'api',
    'title': 'API',
    'color': '#FF9800'
  },
  {
    'id': 4,
    'handle': 'issue',
    'title': 'Issue',
    'color': '#0091EA'
  },
  {
    'id': 5,
    'handle': 'mobile',
    'title': 'Mobile',
    'color': '#9C27B0'
  }
];
