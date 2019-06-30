import { Component, OnInit } from '@angular/core';
import {ToDo} from '../../model/todo.model';
import {ToDoService} from '../../model/todo.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'td-done-todos',
  templateUrl: './detail-screen.component.html',
  providers: [ToDoService]
})
export class DetailScreenComponent implements OnInit {

  currentToDo: ToDo;

  constructor(private todoService: ToDoService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {

    console.log('Snapshot:' + this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe(p => this.loadToDo(parseInt(p.get('id'), 10)));

  }

  private loadToDo(id: number) {
    this.todoService.getTodo(id)
      .subscribe(
        todo => this.currentToDo = todo
      );
  }

  updateToDo() {
    this.todoService.updateTodo(this.currentToDo)
      .subscribe();
  }

  backHome() {
    this.router.navigate(['/']);
    // this.router.navigateByUrl('/details/5');
  }
}
