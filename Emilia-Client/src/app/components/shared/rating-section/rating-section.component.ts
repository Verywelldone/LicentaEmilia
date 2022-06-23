import {Component, Input, OnInit} from '@angular/core';
import {RatingControllerService, ServiceRating, ServiceRatingResDTO} from "../../../api";
import {BehaviorSubject, finalize} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {TokenStorageService} from "../../../services/token-storage.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rating-section',
  templateUrl: './rating-section.component.html',
  styleUrls: ['./rating-section.component.scss'],
  providers: [RatingControllerService, DatePipe]
})
export class RatingSectionComponent implements OnInit {

  @Input() serviceId: number;
  serviceRatings: Array<ServiceRatingResDTO>;
  ratingSum: number = 0;
  totalRatings: number = 0;

  loading = new BehaviorSubject<boolean>(false);

  oneStars: any = []
  twoStars: any = []
  threeStars: any = []
  fourStars: any = []
  fiveStars: any = []
  userId: number;
  showAddReview: boolean;

  loggedInUserRating = {
    stars: 0,
    message: ""
  }
  userAlreadyRated: boolean = false;


  constructor(private ratingService: RatingControllerService,
              private sanitizer: DomSanitizer,
              private tokenService: TokenStorageService,
              private datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loadUserRatings();
  }

  loadUserRatings() {
    this.loading.next(true);
    if (this.tokenService.getUser() != null)
      this.userId = this.tokenService.getUser().id;


    this.ratingService.getAllServiceRatingsUsingGET(Number(this.serviceId))
      .pipe(finalize(() => {
        setTimeout(() => this.loading.next(false), 1000)
      }))
      .subscribe(res => {
        console.log(res)
        this.totalRatings = res.length;
        res.forEach(rating => {
          if (this.userId != null && rating.fromUser.id == this.userId) {
            this.userAlreadyRated = true;
          }
          this.ratingSum = this.ratingSum + Number(rating.stars);
          switch (Number(rating.stars)) {
            case 1: {
              this.oneStars.push(rating)
              break
            }
            case 2: {
              this.twoStars.push(rating)
              break
            }
            case 3: {
              this.threeStars.push(rating)
              break
            }
            case 4: {
              this.fourStars.push(rating)
              break
            }
            case 5: {
              this.fiveStars.push(rating)
              break
            }
          }
        })
        this.serviceRatings = res
      })
  }


  calculateMedianRating() {
    return Math.round(((this.ratingSum / this.totalRatings) * 100) / 100);
  }

  toggleAddReview() {
    this.showAddReview = !this.showAddReview;
  }

  sendReview() {
    console.log(this.loggedInUserRating.stars)
    let rating: ServiceRating = {
      fromUser: this.userId,
      toService: Number(this.serviceId),
      message: this.loggedInUserRating.message,
      stars: Number(this.loggedInUserRating.stars),
      date: this.datepipe.transform(new Date(), 'YYYY-MM-dd')
    }
    this.ratingService.saveRatingUsingPOST(rating).subscribe(() => {
      this.loadUserRatings()
    })
  }
}
