import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myTask: string;
  addTask: boolean;
  tasks: any[];

  constructor(public afDB: AngularFireDatabase,
    ) {
      this.getTasks();
    }


    addTaskToFirebase() {
      this.afDB.list('Task/').push({
        text: this.myTask,
        date: new Date().toISOString(),
        checked: false
      });
    }

    showForm() {
      this.addTask = !this.addTask;
      this.myTask = ''
    }

    getTasks() {
      this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
        this.tasks = [];
        actions.forEach(action => {
          this.tasks.push({
            key: action.key,
            text: action.payload.exportVal().text,
            hour: action.payload.exportVal().date.substring(11, 16),
            checked: action.payload.exportVal().checked
          });
        });
      });
    }
}

