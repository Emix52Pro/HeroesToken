import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeroesService, Heroe } from 'src/app/services/heroes.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnDestroy {
  heroes: Heroe[] = [];
  heroes2: Heroe[] = [];
  private heroesSubscription: Subscription;

  constructor(
    
    private _heroesService: HeroesService,
    private router: Router
  ) {
    this.heroes = this._heroesService.getHeroes();
    this.heroes2 = this.heroes;
    // Suscribirse a los cambios en el arreglo heroes2 del servicio
    this.heroesSubscription = this._heroesService.getHeroes2Observable().subscribe(
      (heroes) => {
        this.heroes2 = heroes;
      }
    );

    // Detectar cambios de ruta para refrescar la vista cuando se navegue a la página de "heroes"
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/heroes') {
        this.refreshHeroes();
      }
    });
  }

  public search_string: string = '';

  ngOnInit(): void {

    this.heroes2 = this._heroesService.getHeroes2();
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.heroesSubscription.unsubscribe();
  }

  refreshHeroes() {
    this.heroes2 = this._heroesService.getHeroes2();
  }

  verHeroe(idx: number) {
    console.log(idx);
    this.router.navigate(['/heroe', idx]);
  }

  updateSearchString(text: string) {
    this.search_string = text; // Actualizar el valor local de search_string
    this.filterResults();
  }

  filterResults() {
    if (!this.search_string) {
      this.heroes2 = this.heroes;
    } else {
      this.heroes2 = this.heroes.filter(
        (heroe) =>
          heroe?.nombre.toLowerCase().includes(
            this.search_string.toLowerCase()
          )
      );
    }

    // Actualizar la variable en el servicio
    this._heroesService.updateHeroes2(this.heroes2);
    this.router.navigate(['/heroes']);
  }
}
