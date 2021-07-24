import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '@runno/api-interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'runno-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() activity!: Activity;
  constructor(private sanitizer: DomSanitizer) {}
  buildBackgroundImageUrl(color: string) {
    const str = `url('data:image/svg+xml;utf8, <svg  version="1.1"  id="Layer_1"  xmlns="http://www.w3.org/2000/svg"   xmlns:xlink="http://www.w3.org/1999/xlink"     x="0px"  y="0px"  width="100%"  height="100%"  viewBox="0 0 753.289 1670.659"
     style="enable-background: new 0 0 753.289 1670.659"  xml:space="preserve"  >
      <g>  <path fill="${color}"
       d="M416.34,257.757c1.688-1.128,3.908-1.697,5.201-3.137c15.87-17.681,33.887-6.6,40.105-19.864  c2.803-5.978,5.205-12.112,7.642-18.202c2.548-6.368-4.772-20.745-11.464-23.305c-28.59-10.934-33.55-35.238-38.749-45.232  c-16.556-31.825-4.683-76.556,28.87-95.001c17.89-9.835,37.438-15.911,58.36-15.419c7.881,0.186,22.946-5.65,34.913,0.739  c9.317,4.974,20.78-5.769,33.576,10.981c4.623,6.052,11.811,10.679,8.514,20.316c-0.806,2.356,1.013,5.776,3.731,7.434  c3.406,2.077,4.834,5.804,7.509,8.45c5.922,5.859,8.049,11.994,3.858,20.139c-3.541,6.882,3.342,10.874,6.447,15.52  c3.517,5.263,9.236,8.759,12.851,14.163c11.416,17.062-13.06,12.312-4.994,22.744c6.873,8.89-2.948,15.737,3.648,24.053  c1.804,2.275,1.602,4.905,1.445,7.531c-1.003,16.746,7.721,31.179-10.028,37.569c-9.382,3.378-17.627,8.985-26.844,12.663  c-5.063,2.02-8.313,6.025-9.395,11.755c-0.977,5.174-17.65,41.487,6.34,47.831c21.129,5.588,65.306,24.095,77.819,45.602  c8.243,14.169,12.363-7.18,47.626,13.833c4.498,2.681,1.546,12.337,10.189,15.11c2.678,0.859,3.467,4.082,3.267,6.706  c-1.094,14.316,3.987,28.501,1.659,42.655c-2.751,16.728,2.224,34.202-3.412,50.147c-12.422,35.14-5.351,78.397-20.791,108.155  c-19.586,37.749-23.453,51.487-43.394,61.484c-9.513,4.769-15.909,2.857-22.858-5.502c-20.941-25.189-21.12-32.738-24.321-23.996  c-7.384,20.166-15.989,39.976-21.903,60.56c-5.205,18.117-7.874,36.954-14.629,54.739c-2.308,6.078,0.938,12.168,2.31,17.982  c3.732,15.824,3.925,31.716,2.678,47.736c-1.071,13.767-5.901,15.784-12.106,15.644c-10.251-0.231-10.042,0.179-12.575,9.694  c-8.057,30.272,26.222,37.995,49.961,73.491c49.921,74.645,103.058,135.567,86.178,170.105  c-36.897,75.492-36.237,37.854-127.829,105.1c-37.365,27.433-80.665,40.309-126.289,83.554c-8.967,8.5-18.644,16.043-26.274,26.019  c-3.929,5.136-5.533,11.326-9.572,16.391c-2.189,2.745-2.665,7.609,1.525,10.917c6.551,5.173-6.868,32.203-10.378,38.301  c-4.474,7.775-6.368,16.699-6.778,25.85c-0.517,11.551-2.11,23.041-1.734,34.656c0.081,2.51-0.534,5.644-2.044,7.504  c-10.997,13.547,2.223,26.873,10.477,43.353c14.607,29.166-15.781,36.229-40.912,22.672c-8.999-4.855,4.315-5.468-17.647-16.218  c-1.949-0.954-3.917-2.795-3.832-4.511c0.684-13.736-28.17-19.119-17.295-35.292c1.348-2.005-0.078-5.728-3.679-6.751  c-9.196-2.614-13.436-9.305-11.013-18.353c1.023-3.819,2.841-6.811-2.466-9.026c-3.477-1.452-3.978-5.744-2.28-8.37  c3.669-5.673-1.108-13.521-0.773-14.902c4.045-16.69-10.92-25.256-16.441-37.809c-6.513-14.805-21.812,12.482-29.965,27.051  c-16.767,29.963-34.236,59.536-43.739,93.014c-2.971,10.466-8.453,20.208-7.946,31.549c0.051,1.14-0.737,2.968-0.256,3.34  c7.677,5.939,4.397,16.315,9.486,23.156c3.444,4.63,4.189,9.838,2.825,14.925c-5.276,19.673,3.868,37.156-5.202,43.409  c-6.932,4.779-7.215,13.395-0.122,17.567c9.348,5.5,7.934,10.862,17.179,10.232c9.55-0.651,9.635,6.356,12.318,9.002  c10.213,10.074,10.397,11.366,3.855,23.742c-1.724,3.262-4.675,4.243-7.866,4.747c-8.057,1.273-15.936,4.078-23.886,4.895  c-13.436,1.381-27.098,3.406-40.608,0.502c-2.958-0.636-8.005,0.226-7.275-6.083c0.178-1.54-3.478-2.594-5.754-2.93  c-11.573-1.706-18.532-11.067-27.728-16.704c-1.373-0.842-3.432-2.904-2.587-4.176c4.377-6.585-2.25-6.978-4.828-10.111  c-5.088-6.181-12.27-11.808-9.934-21.492c0.979-4.058-1.89-5.123-4.561-6.212c-31.16-12.711-35.931-41.309-50.712-49.669  c-8.436-4.772-12.309-36.718,9.208-48.972c78.554-44.736,67.955-7.878,115.613-149.974c10.45-31.157-0.026-35.702,21.604-100.725  c3.18-9.558,11.087-17.9,16.487-26.241c22.574-34.872,34.265-57.42,45.521-60.565c4.394-1.228,6.542-4.359,7.294-8.837  c8.181-48.712,35.358-96.53,40.712-120.215c3.29-14.553,8.91-28.351,14.801-42.031c10.552-24.505,15.457-50.709,22.72-76.203  c1.336-4.689,0.859-9.046-2.885-12.934c-3.605-3.743-19.894-41.709-22.872-59.818c-1.931-11.742-1.76-23.826,0.549-35.626  c3.029-15.478,3.788-31.305,7.445-46.687c0.992-4.173-3.18-22.327,4.914-32.86c4.211-5.479,3.459-13.408,3.999-20.36  c10.155-130.834,23.126-97.648,4.028-277.564c-0.842-7.936-2.044-8.504-9.833-7.335c-9.095,1.364-16.464,6.888-24.82,10.038  c-64.865,24.453-74.848-0.056-56.883,42.772c9.319,22.217,8.035,43.83,39.892,86.444c7.004,9.369,29.621,29.75,29.62,60.293  c-0.002,34.804,14.99,38.4-6.702,73.815c-3.167,5.17-8.653,6.828-14.493,3.6c-3.597-1.988-6.822-1.457-10.597-0.236  c-17.453,5.646-32.212-4.645-39.772-1.404c-2.738,1.174-5.572-1.389-8.079-2.656c-4.493-2.273-4.5-10.301,2.573-9.935  c12.363,0.639,0.45-5.939,5.645-19.869c5.916-15.864,9.081-32.438,12.617-48.92c1.049-4.89,0.49-9.22-3.118-12.969  c-32.108-33.368-18.932-15.636-59.434-69.732c-17.374-23.205-47.299-87.744-52.404-95.825c-3.61-5.713-0.998-11.999-1.298-17.966  c-0.353-7.016,5.912-9.116,11.178-11.852c22.989-11.942,29.962-34.55,85.679-53.684c38.43-13.197,54.246-11.261,66.491-26.158  c11.295-13.742,27.233-21.996,45.138-25.47c9.135-1.773,17.446-6.732,27.042-6.867C392.982,262.6,403.548,266.304,416.34,257.757z  M322.131,1228.777c38.887,1.96,68.549-35.109,85.742-51.069c14.106-13.094,27.129-27.704,36.197-44.696  c40.242-75.4,88.247-83.644,96.71-86.498c5.118-1.726,7.083-8.252,2.826-11.426c-7.225-5.386-14.671-11.375-23.009-14.104  c-22.754-7.446-31.857-19.447-38.632-3.595c-5.837,13.658-8.705,9.861-22.288,37.138c-4.29,8.614-7.617,19.52-20.692,19.542  c-2.861,0.005-4.036,3.024-5.848,4.879c-9.854,10.094-18.482,21.413-30.336,29.517c-10.722,7.33-19.76,27.424-24.207,39.599  c-13.371,36.605-52.948,43.348-64.043,70.799C311.689,1225.944,315.792,1228.458,322.131,1228.777z M680.193,445.786  c0.414-5.376-0.703-21.559-6.64-20.453c-3.265,0.608-1.978,4.757-1.825,7.536c1.213,21.971-9.292,12.286-6.147,23.96  c4,14.844,0.284,21.792,6.812,21.832C681.057,478.713,678.609,455.11,680.193,445.786z M673.508,366.252  c-1.108-2.116-7.466-1.978-6.401,0.814c0.793,2.079,2.805,1.346,4.422,1.304C672.846,368.336,673.594,367.666,673.508,366.252z"  />
       </g>
        </svg>');`;
    return str;
  }
}