import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
declare var mxGraph: any;
declare var mxHierarchicalLayout: any;

@Component({
  selector: "app-boworkflowdesign",
  templateUrl: "./boworkflowdesign.component.html"
})
export class boworkflowdesignComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;
  ngAfterViewInit() {
    const graph = new mxGraph(this.graphContainer.nativeElement);
    try {
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      const vertex1 = graph.insertVertex(parent, '1', 'Initiate Request', 0, 0, 200, 80);
      const vertex2 = graph.insertVertex(parent, '2', 'Boss', 0, 0, 200, 80, 'ROUNDED;strokeColor=red;fillColor=#99CC66');
      const vertex3 = graph.insertVertex(parent, '3', 'HR', 0, 0, 200, 80);

      const vertex5 = graph.insertVertex(parent, '5', 'CEO', 0, 0, 200, 80, 'ROUNDED;strokeColor=blue;fillColor=#FFCC00');
      const vertex6 = graph.insertVertex(parent, '6', 'End', 0, 0, 200, 80);
      graph.insertEdge(parent, '', '', vertex1, vertex2);
      graph.insertEdge(parent, '', '', vertex1, vertex3);
      graph.insertEdge(parent, '', '', vertex3, vertex5);
      graph.insertEdge(parent, '', '', vertex2, vertex5);
      graph.insertEdge(parent, '', '', vertex5, vertex6);

    } finally {
      graph.getModel().endUpdate();
      new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }



  }


}



