import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AteliersService } from '../../../services/ateliers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm:FormGroup;
  isSubmited:boolean=false;
  errorAuth:string='';
  

  constructor( private formBuilder: FormBuilder,private router:Router,private ateliersService:AteliersService) { }

  ngOnInit(): void {
    if(window.localStorage.getItem('token')){
      this.router.navigate(['atelier']);
      return;
    }
    this.formBuilde();
  }

  get formControls() {return this.authForm.controls;}
  formBuilde()
  {
    this.authForm= this.formBuilder.group({

      ID:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]]
    });
  }

  authentification()
  { 
    this.isSubmited=true;
    if(this.authForm.invalid)
    {
     
      return;
    }
    else
    {
      const login =
      {
        email: this.authForm.controls.ID.value,
        password: this.authForm.controls.password.value
      }
      console.log(login);
      this.ateliersService.login(login).subscribe((res: any) => {
        if(res.status === 200)
        {
        console.log(res.success.token);
        window.localStorage.setItem('token', res.success.token);
        this.router.navigate(['atelier'])
        
        

        }
        else{
            alert(res.message);
        }
      }, err => {
        console.log(err);
        this.errorAuth="password and email don't match";
      },()=>{console.log('finished');}
      );
      
    }

  }
}
